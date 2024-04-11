import 'reflect-metadata'
import { NextFunction, Request, Response, Router } from 'express'
import { Service } from 'typedi'
import { CustomError } from '@utils/CustomError'
import { UserMaster } from '@database/models'
import { ValidateRequests } from '@core/validation'
import { ValidationForId, ValidationForPagination } from '@validations/index'
import { UserMasterService } from '@service/userMaster.service'

@Service()
export class UserMasterController {
  public router: Router
  
  constructor(public userMasterService: UserMasterService) {
    this.router = Router()
    this.initRoutes()
  }

  initRoutes(): void {
    this.router.get('/:id', ValidationForId, ValidateRequests, this.fetchUserById)
    this.router.get('/', ValidationForPagination, ValidateRequests, this.fetchAllUserInformation)
    this.router.delete('/:id', ValidationForId, ValidateRequests, this.removeUserById)
  }
  
  fetchUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 0)
    const userInfo = await this.userMasterService.fetchById(id)
    if (userInfo) {
      res.status(200).json({ status: 200, data: userInfo })
    } else {
      next(new CustomError(404, `${UserMaster.tableName} not found with id: ${id}`))
    }
  }
  
  removeUserById = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id, 0)
    const isRemoved = await this.userMasterService.deleteRecord({ where: { id } })
    if (isRemoved) {
      response.status(200).json({ status: 200, data: `${UserMaster.tableName}[${id}] removed successfully` })
    } else {
      next(new CustomError(404, `${UserMaster.tableName} not found with id: ${id}`))
    }
  }

  fetchAllUserInformation = async (request: Request, response: Response) => {
    
    if (request.query.page && request.query.limit) {
      const page = parseInt(request.query.page.toString())
      const limit = parseInt(request.query.limit.toString())
      response.status(200).send({ status: 200, data: await this.paginationRequest(page, limit) })
    } else {
      response.status(200).send({ status: 200, data: await this.fetchAllUserMasters()})
    }
  }

  private async fetchAllUserMasters() {
    try {
      return await this.userMasterService.fetchAllRecord({})
    } catch (error) {
      console.error('Error fetching fetchAllUserMasters:', error)
      throw new CustomError(500, 'Internal Server Error')
    }
  }

  private async paginationRequest(page: number, limit: number) {
    try {
      return await this.userMasterService.fetchPagination(page, limit)
    } catch (error) {
      console.error('Error fetching paginationRequest:', error)
      throw new CustomError(500, 'Internal Server Error')
    }
  }
}

