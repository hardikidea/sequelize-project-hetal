import { Service } from 'typedi'
import { UserTokenMaster } from '../database/models'
import { UserTokenMasterRepository } from '../repository'
import { FindOptions } from 'sequelize'
import { IWriteRepository, IReadRepository, IDeleteRepository } from '../core/IGenericRepository.interface'
import { TPaginationData } from '../types/TPaginationData.type'

@Service()
export class UserTokenMasterService
  implements IWriteRepository<UserTokenMaster>, IReadRepository<UserTokenMaster>, IDeleteRepository<UserTokenMaster>
{
  constructor(public repositoryInstance: UserTokenMasterRepository) {}

  async deleteRecord(option?: FindOptions): Promise<number> {
    return this.repositoryInstance.delete(option ?? {})
  }
  async fetchRecord(option?: FindOptions): Promise<UserTokenMaster | null> {
    return await this.repositoryInstance.find(option ?? {})
  }
  async fetchAllRecord(option?: FindOptions): Promise<UserTokenMaster[]> {
    return this.repositoryInstance.findAll(option ?? {})
  }
  async fetchById(id: number): Promise<UserTokenMaster | null> {
    return this.repositoryInstance.findById(id)
  }
  async fetchPagination(page: number, limit: number): Promise<TPaginationData<UserTokenMaster>> {
    const offset = (page - 1) * limit
    const dataItems = await this.repositoryInstance.pagination({ limit, offset })
    return { ...dataItems, currentPage: page }
  }
  async createRecord(item: Partial<UserTokenMaster>): Promise<UserTokenMaster> {
    return await this.repositoryInstance.create(item)
  }
  async updateRecord(id: number, item: Partial<UserTokenMaster>, isForceToUpdate: boolean = false): Promise<number> {
    return await this.repositoryInstance.update(id, item, isForceToUpdate)
  }
}
