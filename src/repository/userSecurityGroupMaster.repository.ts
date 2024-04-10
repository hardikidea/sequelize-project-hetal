import { UserSecurityGroupMaster } from '../database/models'
import { GenericRepository } from '../core/generic-repository.service'

export class UserSecurityGroupMasterRepository extends GenericRepository<UserSecurityGroupMaster> {
  private static instance: UserSecurityGroupMasterRepository

  private constructor() {
    super(UserSecurityGroupMaster)
  }

  public static getInstance(): UserSecurityGroupMasterRepository {
    if (!UserSecurityGroupMasterRepository.instance) {
      UserSecurityGroupMasterRepository.instance = new UserSecurityGroupMasterRepository()
    }
    return UserSecurityGroupMasterRepository.instance
  }
}
