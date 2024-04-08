import { IPagination } from "../interface/IPagination.interface"
import { CustomError } from "../utils/CustomError"
import { FindOptions, UniqueConstraintError } from "sequelize"
import { UserSecurityGroupMaster } from "../database/models"
import { UserSecurityGroupMasterRepository } from "../repository/index"

export class UserSecurityGroupMasterService {
  private static instance: UserSecurityGroupMasterService

  constructor(private UserSecurityGroupMasterRepositoryInstance = UserSecurityGroupMasterRepository.getInstance()) {}

  public static getInstance(): UserSecurityGroupMasterService {
    if (!UserSecurityGroupMasterService.instance) {
      UserSecurityGroupMasterService.instance = new UserSecurityGroupMasterService()
    }
    return UserSecurityGroupMasterService.instance
  }

  public findAll = async (options?: FindOptions) => {
    try {
      return await this.UserSecurityGroupMasterRepositoryInstance.findAll(options ? options : {})
    } catch (error) {
      throw error
    }
  }
  public pagination = async (offset: number, limit: number): Promise<IPagination<UserSecurityGroupMaster>> => {
    try {
      return await this.UserSecurityGroupMasterRepositoryInstance.pagination({ limit, offset })
    } catch (error) {
      throw new CustomError(400, `Error fetching all UserSecurityGroups`)
    }
  }

  public findById = async (id: number) => {
    try {
      const userSecurityGroupInformation = await this.UserSecurityGroupMasterRepositoryInstance.findById(id)
      if (userSecurityGroupInformation) {
        return userSecurityGroupInformation
      }
    } catch (error) {}
  }

  public delete = async (id: number) => {
    try {
      const userSecurityGroupInformation = await this.UserSecurityGroupMasterRepositoryInstance.delete(id)
      if (userSecurityGroupInformation) {
        return userSecurityGroupInformation
      }
    } catch (error) {}
  }

  public create = async (record: Partial<UserSecurityGroupMaster>): Promise<void> => {
    try {
      await this.UserSecurityGroupMasterRepositoryInstance.create(record)
    } catch (error) {
      if(error instanceof UniqueConstraintError) {
        throw error;
      } else {
        throw new CustomError(400, `Error fetching all UserSecurityGroupMaster`)
      }
    }
  }
}
