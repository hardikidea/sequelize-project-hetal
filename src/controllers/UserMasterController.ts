import { NextFunction, Request, Response, Router } from 'express'
import { UserMasterService } from '../service/userMaster.service'
import { Inject, Service } from 'typedi'
import { ValidationForId, ValidationForLoginRequest, ValidationForPagination, ValidationForRegistration } from '@validations/index'
import { CustomError } from '@utils/CustomError'
import { CoreValidation } from '@core/validation'
import { UserMaster } from '@database/models'
import { BaseController } from '@core/base.Controller'

@Service()
export class UserMasterController extends BaseController {
  public router: Router

  constructor(@Inject() private userMasterService: UserMasterService) {
    super()
    this.router = Router()
    this.initRoutes()
  }

  initRoutes(): void {
    this.router.get('/', ValidationForPagination, CoreValidation, this.fetchAllUserInformation)
    this.router.get('/:id', ValidationForId, this.fetchUserById)
    this.router.delete('/:id', ValidationForId, this.removeUserById)
    this.router.post('/signup', ValidationForRegistration, CoreValidation, this.signUp)
    this.router.post('/login', ValidationForLoginRequest, CoreValidation, this.login)
  }

  async fetchUserById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id, 0)
    const userInfo = await this.userMasterService.fetchById(id)
    if (userInfo) {
      res.status(200).json({ status: 200, data: userInfo })
    } else {
      next(new CustomError(404, `${UserMaster.tableName} not found with id: ${id}`))
    }
  }
  
  async removeUserById(request: Request, response: Response, next: NextFunction) {
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

  //
  async signUp(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body
    
    try {
      const postUserInformation: Partial<UserMaster> = { email, password }
      await this.userMasterService.createRecord(postUserInformation)
      response.status(200).send({ status: 200, data: `[${email}] Registration done successfully.` })
    } catch (error) {
      response.status(500).send('Internal Server Error')
      // if(error instanceof UniqueConstraintError) {
      //   const groupedByPath = _.groupBy(error.errors, 'path')
      //   const result = _.mapValues(groupedByPath, (group) => group.map((error) => `[${error.value}] already exists in the database`.trim()));
      //   response.status(400).send({ status: 400, error: result })
      // } else {
        
      // }
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body

    try {
      const userInformation = await this.userMasterService.login(email, password)
      if (!userInformation) {
        return response.status(401).send({ status: 401, data: `Invalid email or password` })
      } else {
        response.cookie('permission', userInformation.email, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        response.status(200).send({ status: 200, data: userInformation })
      }
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }
}
