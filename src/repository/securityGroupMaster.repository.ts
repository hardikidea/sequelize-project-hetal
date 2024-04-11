import { Service } from 'typedi'
import { GenericRepository } from '../core/generic-repository.service'
import { SecurityGroupMaster } from '@database/models'

@Service()
export class SecurityGroupMasterRepository extends GenericRepository<SecurityGroupMaster> {
  constructor() {
    super(SecurityGroupMaster)
  }

  public sayHello = () => {
    try {
      return 'sayHello'
    } catch (error) {
      console.error(error)
      throw new Error('Error fetching all items')
    }
  }
}
