import { Service } from 'typedi'
import { SecurityGroupMaster } from '../database/models'
import { SecurityGroupMasterRepository } from '@repository/securityGroupMaster.repository'
import { FindOptions } from 'sequelize'
import { IWriteRepository, IReadRepository, IDeleteRepository } from '../core/IGenericRepository.interface'
import { TPaginationData } from '../types/TPaginationData.type'

@Service()
export class SecurityGroupMasterService implements IWriteRepository<SecurityGroupMaster>, IReadRepository<SecurityGroupMaster>, IDeleteRepository<SecurityGroupMaster> {
  constructor(public securityGroupMaster: SecurityGroupMasterRepository) {}
  async deleteRecord(option?: FindOptions): Promise<number> {
    return this.securityGroupMaster.delete(option ?? {})
  }
  async fetchRecord(option?: FindOptions): Promise<SecurityGroupMaster | null> {
    return await this.securityGroupMaster.find(option ?? {})
  }
  async fetchAllRecord(option?: FindOptions): Promise<SecurityGroupMaster[]> {
    return this.securityGroupMaster.findAll(option ?? {})
  }
  async fetchById(id: number): Promise<SecurityGroupMaster | null> {
    return this.securityGroupMaster.findById(id)
  }
  async fetchPagination(page: number, limit: number): Promise<TPaginationData<SecurityGroupMaster>> {
    const offset = (page - 1) * limit
    const dataItems = await this.securityGroupMaster.pagination({ limit, offset })
    return { ...dataItems, currentPage: page }
  }
  async createRecord(item: Partial<SecurityGroupMaster>): Promise<SecurityGroupMaster> {
    return await this.securityGroupMaster.create(item)
  }
  async updateRecord(id: number, item: Partial<SecurityGroupMaster>, isForceToUpdate: boolean = false): Promise<number> {
    return await this.securityGroupMaster.update(id, item, isForceToUpdate)
  }
}
