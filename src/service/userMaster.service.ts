
import { UserMaster } from "@models/index";
import { UserMasterRepository } from "@repositorys/index"
import { CustomError } from "@utils/CustomError";
import { IPagination } from "interface/IPagination.interface";

class UserMasterService {

    private static instance: UserMasterService;
    
    constructor(private userMasterRepositoryInstance = UserMasterRepository){
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
    public fetchUserPagination = async (offset: number, limit: number): Promise<IPagination<UserMaster>> => {
        try {
            return await this.userMasterRepositoryInstance.findAndCountAll({ limit, offset })
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