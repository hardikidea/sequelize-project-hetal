import { Model, UniqueConstraintError } from 'sequelize'
import { IRepository } from './IRepository.interface'
import { FindOptions, WhereOptions } from 'sequelize'
import { IPagination } from '../interface/IPagination.interface'
import _ from 'lodash'
import { CustomError } from '../utils/CustomError'


export abstract class GenericRepository<T extends Model<T>> implements IRepository<T> {
  constructor(protected model: typeof Model & { new (): T }) {}
  async find(findOptions?: FindOptions): Promise<T | null> {
    try {
      if (findOptions) return await this.model.findOne(findOptions)
      return await this.model.findOne()
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching all items')
    }
  }
  async findAll(findOptions?: FindOptions): Promise<T[]> {
    try {
      if (findOptions) return await this.model.findAll(findOptions)
      return await this.model.findAll()
    } catch (error: any) {
      if (error?.name === 'SequelizeDatabaseError') {
        throw new CustomError(400, error.message)
      } else {
        throw new Error('UnHandled: Error fetching all items')
      }
    }
  }

  async findById(id: number): Promise<T | null> {
    try {
      return await this.model.findByPk(id)
    } catch (error) {
      console.error(error)
      throw new Error(`Error fetching item with id ${id}`)
    }
  }

  async create(item: Partial<T['_creationAttributes']>): Promise<T> {
    try {
      // No need for casting here; the type is explicitly set via the method's parameter
      return await this.model.create(item as any)
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw error;
      } else {
        throw new Error('Error creating new item');
      }
    }
  }

  async update(id: number, item: Partial<T>): Promise<[affectedCount: number]> {
    try {
      const whereClause: WhereOptions = { id }
      return await this.model.update(item, { where: whereClause })
    } catch (error) {
      console.error(error)
      throw new Error(`Error updating item with id ${id}`)
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const whereClause: WhereOptions = { id }
      return await this.model.destroy({ where: whereClause })
    } catch (error) {
      console.error(error)
      throw new Error(`Error deleting item with id ${id}`)
    }
  }

  async findAndCountAll(options: FindOptions): Promise<IPagination<T>> {
    try {
      const { count, rows } = await this.model.findAndCountAll(options)
      return { rows, count, totalPages: Math.ceil(count / options.limit!) }
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching all items')
    }
  }
}
