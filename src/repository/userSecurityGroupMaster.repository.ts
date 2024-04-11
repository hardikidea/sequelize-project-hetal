import { Service } from 'typedi'
import { GenericRepository } from '../core/generic-repository.service'
import { UserSecurityGroupMaster } from '../database/models'

@Service()
export class UserSecurityGroupMasterRepository extends GenericRepository<UserSecurityGroupMaster> {
  constructor() {
    super(UserSecurityGroupMaster)
  }
}
