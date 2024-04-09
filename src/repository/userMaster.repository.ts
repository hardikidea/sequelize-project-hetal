
import { Service } from "typedi"
import { GenericRepository } from "../core/generic-repository.service"
import { UserMaster } from "../database/models"

@Service()
export class UserMasterRepository extends GenericRepository<UserMaster> {
  
  constructor() {
    super(UserMaster)
  }

  public login = async (emailAddress: string, password: string) => {
    try {
      const userInformation = await this.find({ where: { email: emailAddress, password, isActive: true } })
      if (userInformation) {
        return userInformation
      }
    } catch (error) {}
  }

  public sayHello =  () => {
      try {
          return 'sayHello'
      } catch (error) {
          console.error(error);
          throw new Error('Error fetching all items');
      }
  }
}
