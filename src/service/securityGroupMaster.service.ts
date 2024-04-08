import { IPagination } from "../interface/IPagination.interface"
import { CustomError } from "../utils/CustomError"
import { FindOptions, UniqueConstraintError } from "sequelize"
import { SecurityGroupMasterRepository } from "../repository"
import { SecurityGroupMaster } from "../database/models"

export class SecurityGroupMasterService {
  private static instance: SecurityGroupMasterService
  

  constructor(private securityGroupMasterRepositoryInstance = SecurityGroupMasterRepository.getInstance()) {}

  public static getInstance(): SecurityGroupMasterService {
    if (!SecurityGroupMasterService.instance) {
      SecurityGroupMasterService.instance = new SecurityGroupMasterService()
    }
    return SecurityGroupMasterService.instance
  }

  public findAll = async (options?: FindOptions) => {
    try {
      return await this.securityGroupMasterRepositoryInstance.findAll(options ? options : {})
    } catch (error) {
      throw error
    }
  }
  public pagination = async (offset: number, limit: number): Promise<IPagination<SecurityGroupMaster>> => {
    try {
      return await this.securityGroupMasterRepositoryInstance.pagination({ limit, offset })
    } catch (error) {
      throw new CustomError(400, `Error fetching all securityGroups`)
    }
  }

  public findById = async (id: number) => {
    try {
      const securityGroupInformation = await this.securityGroupMasterRepositoryInstance.findById(id)
      if (securityGroupInformation) {
        return securityGroupInformation
      }
    } catch (error) {}
  }

  public delete = async (id: number) => {
    try {
      const securityGroupInformation = await this.securityGroupMasterRepositoryInstance.delete(id)
      if (securityGroupInformation) {
        return securityGroupInformation
      }
    } catch (error) {}
  }

  public create = async (record: Partial<SecurityGroupMaster>): Promise<void> => {
    try {
      await this.securityGroupMasterRepositoryInstance.create(record)
    } catch (error) {
      if(error instanceof UniqueConstraintError) {
        throw error;
      } else {
        throw new CustomError(400, `Error fetching all securityGroups`)
      }
    }
  }
}
