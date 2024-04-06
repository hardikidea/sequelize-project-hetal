import UserMaster from "@models/UserMaster";
import { GenericRepository } from "core/generic-repository.service";


class UserMasterRepository extends GenericRepository<UserMaster> {
    
    private static instance: UserMasterRepository;
    
    private constructor() {
      super(UserMaster);
    }

    public static getInstance(): UserMasterRepository {
        if (!UserMasterRepository.instance) {
            UserMasterRepository.instance = new UserMasterRepository();
        }
        return UserMasterRepository.instance;
    }

    // public sayHello =  () => {
    //     try {
    //         return 'sayHello'
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error('Error fetching all items');
    //     }
    // }

  }

//   export const userMasterRepository = UserMasterRepository.getInstance();
  export default UserMasterRepository.getInstance();