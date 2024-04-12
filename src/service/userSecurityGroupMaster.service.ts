import { Service } from 'typedi'
import { UserSecurityGroupMaster } from '../database/models'
import { UserSecurityGroupMasterRepository } from '../repository'
import { FindOptions } from 'sequelize'
import { IWriteRepository, IReadRepository, IDeleteRepository } from '../core/IGenericRepository.interface'
import { TPaginationData } from '../types/TPaginationData.type'

@Service()
export class UserSecurityGroupMasterService
  implements
    IWriteRepository<UserSecurityGroupMaster>,
    IReadRepository<UserSecurityGroupMaster>,
    IDeleteRepository<UserSecurityGroupMaster>
{
  constructor(public repositoryInstance: UserSecurityGroupMasterRepository) {}
  async deleteRecord(option?: FindOptions): Promise<number> {
    return this.repositoryInstance.delete(option ?? {})
  }
  async fetchRecord(option?: FindOptions): Promise<UserSecurityGroupMaster | null> {
    return await this.repositoryInstance.find(option ?? {})
  }
  async fetchAllRecord(option?: FindOptions): Promise<UserSecurityGroupMaster[]> {
    return this.repositoryInstance.findAll(option ?? {})
  }
  async fetchById(id: number): Promise<UserSecurityGroupMaster | null> {
    return this.repositoryInstance.findById(id)
  }
  async fetchPagination(page: number, limit: number): Promise<TPaginationData<UserSecurityGroupMaster>> {
    const offset = (page - 1) * limit
    const dataItems = await this.repositoryInstance.pagination({ limit, offset })
    return { ...dataItems, currentPage: page }
  }
  async createRecord(item: Partial<UserSecurityGroupMaster>): Promise<UserSecurityGroupMaster> {
    return await this.repositoryInstance.create(item)
  }
  async updateRecord(id: number, item: Partial<UserSecurityGroupMaster>): Promise<number> {
    return await this.repositoryInstance.update(id, item)
  }

  // async login(email: string, password: string) {
  //   return await this.UserSecurityGroupMasterRepository.login(email, password)
  // }
}
