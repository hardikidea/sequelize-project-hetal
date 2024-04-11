import { Service } from 'typedi'
import { GenericRepository } from '../core/generic-repository.service'
import { UserMaster } from '../database/models'

@Service()
export class UserMasterRepository extends GenericRepository<UserMaster> {
  constructor() {
    super(UserMaster)
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
