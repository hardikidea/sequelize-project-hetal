
import { userMasterRepository } from "@repositorys/userMaster.repository"
import { CustomError } from "@utils/CustomError";

class UserMasterService {

    private static instance: UserMasterService;
    
    constructor(private userMasterRepositoryInstance = userMasterRepository){
    }

    public static getInstance(): UserMasterService {
        if (!UserMasterService.instance) {
            UserMasterService.instance = new UserMasterService();
        }
        return UserMasterService.instance;
    }

    public fetchUserAllData = async () => {
        try {
            return await this.userMasterRepositoryInstance.findAll()
        } catch (error) {
            throw new CustomError(400, `Error fetching all users`)
        }
    }

    public fetchUserById = async (userId: number) => {
        try {
            const userInformation = await this.userMasterRepositoryInstance.findById(userId);
            if(userInformation){
                return userInformation;
            }
        } catch (error) {
            
        }
    }

    public removeUserById = async (userId: number) => {
        try {
            const userInformation = await this.userMasterRepositoryInstance.delete(userId);
            if(userInformation){
                return userInformation;
            }
        } catch (error) {
            
        }
    }
}

export default UserMasterService.getInstance();