
import { UserMasterRepository } from "../repository/userMaster.repository"
import { UserMaster } from "../database/models"
import { IPagination } from "../interface/IPagination.interface"

import { CustomError } from "../utils/CustomError"
import { FindOptions, UniqueConstraintError } from "sequelize"

export class UserMasterService {
  private static instance: UserMasterService
  

  constructor(private userMasterRepositoryInstance = UserMasterRepository.getInstance()) {}

  public static getInstance(): UserMasterService {
    if (!UserMasterService.instance) {
      UserMasterService.instance = new UserMasterService()
    }
    return UserMasterService.instance
  }

  public findAll = async (options?: FindOptions) => {
    try {
      return await this.userMasterRepositoryInstance.findAll(options ? options : {})
    } catch (error) {
      throw error
    }
  }
  public pagination = async (offset: number, limit: number): Promise<IPagination<UserMaster>> => {
    try {
      return await this.userMasterRepositoryInstance.pagination({ limit, offset })
    } catch (error) {
      throw new CustomError(400, `Error fetching all users`)
    }
  }

  public findById = async (userId: number) => {
    try {
      const userInformation = await this.userMasterRepositoryInstance.findById(userId)
      if (userInformation) {
        return userInformation
      }
    } catch (error) {}
  }

  public delete = async (userId: number) => {
    try {
      const userInformation = await this.userMasterRepositoryInstance.delete(userId)
      if (userInformation) {
        return userInformation
      }
    } catch (error) {}
  }

  public create = async (userRegistration: Partial<UserMaster>): Promise<void> => {
    try {
      await this.userMasterRepositoryInstance.create(userRegistration)
    } catch (error) {
      if(error instanceof UniqueConstraintError) {
        throw error;
      } else {
        throw new CustomError(400, `Error fetching all users`)
      }
    }
  }
}

// export default UserMasterService.getInstance()
