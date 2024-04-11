import { Service } from 'typedi'
import { UserMasterRepository } from '../repository'
import { UserMaster } from '../database/models'
import { FindOptions } from 'sequelize'
import { IWriteRepository, IReadRepository, IDeleteRepository } from '../core/IGenericRepository.interface'
import { TPaginationData } from '../types/TPaginationData.type'

@Service()
export class UserMasterService implements IWriteRepository<UserMaster>, IReadRepository<UserMaster>, IDeleteRepository<UserMaster> {
  constructor(public repositoryInstance: UserMasterRepository) {}
  async deleteRecord(option?: FindOptions): Promise<number> {
    return this.repositoryInstance.delete(option ?? {})
  }
  async fetchRecord(option?: FindOptions): Promise<UserMaster | null> {
    return await this.repositoryInstance.find(option ?? {})
  }
  async fetchAllRecord(option?: FindOptions): Promise<UserMaster[]> {
    return this.repositoryInstance.findAll(option ?? {})
  }
  async fetchById(id: number): Promise<UserMaster | null> {
    return this.repositoryInstance.findById(id)
  }
  async fetchPagination(page: number, limit: number): Promise<TPaginationData<UserMaster>> {
    const offset = (page - 1) * limit
    const dataItems = await this.repositoryInstance.pagination({ limit, offset })
    return { ...dataItems, currentPage: page }
  }
  async createRecord(item: Partial<UserMaster>): Promise<UserMaster> {
    return await this.repositoryInstance.create(item)
  }
  async updateRecord(id: number, item: Partial<UserMaster>): Promise<number> {
    return await this.repositoryInstance.update(id, item)
  }

  // async login(email: string, password: string) {
  //   return await this.userMasterRepository.login(email, password)
  // }
}
