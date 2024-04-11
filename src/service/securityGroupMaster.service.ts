import { Service } from 'typedi'
import { SecurityGroupMaster } from '@database/models'
import { FindOptions } from 'sequelize'
import { IWriteRepository, IReadRepository, IDeleteRepository } from '../core/IGenericRepository.interface'
import { TPaginationData } from '../types/TPaginationData.type'
import { SecurityGroupMasterRepository } from '@repository/securityGroupMaster.repository'

@Service()
export class SecurityGroupMasterService implements IWriteRepository<SecurityGroupMaster>, IReadRepository<SecurityGroupMaster>, IDeleteRepository<SecurityGroupMaster> {
  constructor(public securityGroupMasterRepository: SecurityGroupMasterRepository) {}
  async deleteRecord(option?: FindOptions): Promise<number> {
    return this.securityGroupMasterRepository.delete(option ?? {})
  }
  async fetchRecord(option?: FindOptions): Promise<SecurityGroupMaster | null> {
    return await this.securityGroupMasterRepository.find(option ?? {})
  }
  async fetchAllRecord(option?: FindOptions): Promise<SecurityGroupMaster[]> {
    return this.securityGroupMasterRepository.findAll(option ?? {})
  }
  async fetchById(id: number): Promise<SecurityGroupMaster | null> {
    return this.securityGroupMasterRepository.findById(id)
  }
  async fetchPagination(page: number, limit: number): Promise<TPaginationData<SecurityGroupMaster>> {
    const offset = (page - 1) * limit
    const dataItems = await this.securityGroupMasterRepository.pagination({ limit, offset })
    return { ...dataItems, currentPage: page }
  }
  async createRecord(item: Partial<SecurityGroupMaster>): Promise<SecurityGroupMaster> {
    return await this.securityGroupMasterRepository.create(item)
  }
  async updateRecord(id: number, item: Partial<SecurityGroupMaster>): Promise<number> {
    return await this.securityGroupMasterRepository.update(id, item)
  }
}
