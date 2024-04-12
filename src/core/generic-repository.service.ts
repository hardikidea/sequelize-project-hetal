import { Model, ModelCtor, UniqueConstraintError, ValidationErrorItem } from 'sequelize'
// import { IRepository } from './IRepository.interface'
import { FindOptions, WhereOptions } from 'sequelize'
import _ from 'lodash'
import { CustomError } from '../utils/CustomError'
import { IWrite, IRead, IDelete } from './IRepository.interface'
import { TPaginationData } from '../types/TPaginationData.type'

export abstract class GenericRepository<T extends Model<T>> implements IWrite<T>, IRead<T>, IDelete<T> {
  constructor(private model: ModelCtor<T>) {
    // console.log('Model:', model)
  }
  async findById(id: number): Promise<T | null> {
    try {
      return await this.model.findByPk(id)
    } catch (error) {
      throw new Error(`Error fetching item with id ${id}`)
    }
  }

  async create(item: Partial<T['_creationAttributes']>): Promise<T> {
    try {
      // No need for casting here; the type is explicitly set via the method's parameter
      return await this.model.create(item as any)
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        const items = error.errors.map((err: ValidationErrorItem) => {
          return `${_.startCase(err.path!)} [${err.value}] already exists.`
        })
        throw new CustomError(400, items.join(', '))
      }
      throw error
    }
  }

  async update(id: number, item: Partial<T>, isForceToUpdate: boolean = false): Promise<number> {
    try {
      const whereClause: WhereOptions = { id }
      return (await this.model.update(item, { where: whereClause, individualHooks: true, paranoid: !isForceToUpdate }))[0]
    } catch (error) {
      throw new Error(`Error updating item with id ${id}`)
    }
  }

  async find(findOptions?: FindOptions): Promise<T | null> {
    try {
      if (findOptions) return await this.model.findOne(findOptions)
      return await this.model.findOne()
    } catch (error) {
      throw new Error('Error fetching all items')
    }
  }

  async findAll(findOptions?: FindOptions): Promise<T[]> {
    try {
      return await this.model.findAll(findOptions ?? {})
    } catch (error: any) {
      if (error?.name === 'SequelizeDatabaseError') {
        throw new CustomError(400, error.message)
      } else {
        throw new Error('UnHandled: Error fetching all items')
      }
    }
  }

  async pagination(options: FindOptions): Promise<TPaginationData<T>> {
    try {
      const { count, rows } = await this.model.findAndCountAll(options)
      return { rows, count, totalPages: Math.ceil(count / options.limit!) }
    } catch (error) {
      throw new Error('Error fetching all items')
    }
  }

  async delete(options: FindOptions): Promise<number> {
    return await this.model.destroy(options ?? {})
  }
}
