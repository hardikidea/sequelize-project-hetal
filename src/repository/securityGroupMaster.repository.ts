import { SecurityGroupMaster } from '../database/models'
import { GenericRepository } from '../core/generic-repository.service'

export class SecurityGroupMasterRepository extends GenericRepository<SecurityGroupMaster> {
  private static instance: SecurityGroupMasterRepository

  private constructor() {
    super(SecurityGroupMaster)
  }

  public static getInstance(): SecurityGroupMasterRepository {
    if (!SecurityGroupMasterRepository.instance) {
      SecurityGroupMasterRepository.instance = new SecurityGroupMasterRepository()
    }
    return SecurityGroupMasterRepository.instance
  }
}
