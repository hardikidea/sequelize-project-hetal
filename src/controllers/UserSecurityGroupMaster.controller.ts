import 'reflect-metadata'
import { Service } from 'typedi'
import { NextFunction, Request, Response, Router } from 'express'
import { UserSecurityGroupMaster } from '@database/models'
import { UserSecurityGroupMasterService } from '@service/userSecurityGroupMaster.service'
import { CustomError } from '@utils/CustomError'
import { ValidateRequests } from '@core/validation'
import { ValidationForCreateSecurityGroup, ValidationForId, ValidationForPagination } from '@validations/index'
import { AuthenticateMiddleware } from '@middlewares/auth.middleware'

@Service()
export class UserSecurityGroupMasterController {
  public router: Router

  constructor(public serviceInstance: UserSecurityGroupMasterService) {
    this.router = Router()
    this.initRoutes()
  }

  initRoutes(): void {
    this.router.get('/', AuthenticateMiddleware , ValidationForPagination, ValidateRequests, this.fetchAll)
    this.router.get('/:id', AuthenticateMiddleware , ValidationForId, ValidateRequests, this.fetchById)
    this.router.post('/', AuthenticateMiddleware , ValidationForCreateSecurityGroup, ValidateRequests, this.create)
    this.router.put('/:id', AuthenticateMiddleware , ValidationForId, ValidateRequests, this.update)
    this.router.delete('/:id', AuthenticateMiddleware , ValidationForId, ValidateRequests, this.removeById)
  }

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userSecurityGroupMasterCreate: Partial<UserSecurityGroupMaster> = request.body
      await this.serviceInstance.createRecord(userSecurityGroupMasterCreate)
      response.status(200).send({ status: 200, data: `[name] created successfully.` })
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }

  update = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id, 0)
    try {
      const userSecurityGroupMasterUpdate: Partial<UserSecurityGroupMaster> = request.body
      const updatedCount = await this.serviceInstance.updateRecord(id, userSecurityGroupMasterUpdate)
      if (updatedCount > 0) {
        response.status(200).send({ status: 200, data: `${UserSecurityGroupMaster.tableName} [id] updated successfully.` })
      } else {
        response.status(400).send(`${UserSecurityGroupMaster.tableName} provided with [id] not found or Invalid Request.`)
      }
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }

  fetchById = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 0)
    const userInfo = await this.serviceInstance.fetchById(id)
    if (userInfo) {
      res.status(200).json({ status: 200, data: userInfo })
    } else {
      next(new CustomError(404, `${UserSecurityGroupMaster.tableName} not found with id: id`))
    }
  }

  removeById = async (request: Request, response: Response, next: NextFunction) => {
    const id: number = parseInt(request.params.id, 0)
    const isRemoved = await this.serviceInstance.deleteRecord({ where: { id } })
    if (isRemoved) {
      response.status(200).json({ status: 200, data: `${UserSecurityGroupMaster.tableName}[id] removed successfully` })
    } else {
      next(new CustomError(404, `${UserSecurityGroupMaster.tableName} not found with id: id`))
    }
  }

  fetchAll = async (request: Request, response: Response) => {
    if (request.query.page && request.query.limit) {
      const page = parseInt(request.query.page.toString())
      const limit = parseInt(request.query.limit.toString())
      response.status(200).send({ status: 200, data: await this.paginationRequest(page, limit) })
    } else {
      response.status(200).send({ status: 200, data: await this.fetchAllRecords() })
    }
  }

  private async fetchAllRecords() {
    try {
      return await this.serviceInstance.fetchAllRecord({})
    } catch (error) {
      console.error('Error fetching fetchAllUserMasters:', error)
      throw new CustomError(500, 'Internal Server Error')
    }
  }

  private async paginationRequest(page: number, limit: number) {
    try {
      return await this.serviceInstance.fetchPagination(page, limit)
    } catch (error) {
      console.error('Error fetching paginationRequest:', error)
      throw new CustomError(500, 'Internal Server Error')
    }
  }
}
