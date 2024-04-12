import { Service } from 'typedi'
import { GenericRepository } from '../core/generic-repository.service'
import { UserTokenMaster } from '../database/models'

@Service()
export class UserTokenMasterRepository extends GenericRepository<UserTokenMaster> {
  constructor() {
    super(UserTokenMaster)
  }
}
