import { NextFunction, Request, Response, Router } from 'express'
import { UserMasterService } from '../service/userMaster.service'
import { ValidationForLoginRequest, ValidationForRegistration } from '@validations/index'
import { ValidateRequests } from '@core/validation'
import { UserMaster } from '@database/models'
import { BaseController } from '@core/base.Controller'
import { Service } from 'typedi'

@Service()
export class SignupController extends BaseController {
  public router: Router

  constructor(private userMasterService: UserMasterService) {
    super()
    this.router = Router()
    this.initRoutes()
  }

  initRoutes(): void {
    this.router.post('/register', ValidationForRegistration, ValidateRequests, this.signUp)
    this.router.post('/login', ValidationForLoginRequest, ValidateRequests, this.login)
  }
  signUp = async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body
    
    try {
      const postUserInformation: Partial<UserMaster> = { email, password }
      await this.userMasterService.createRecord(postUserInformation)
      response.status(200).send({ status: 200, data: `[${email}] Registration done successfully.` })
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }

  login = async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body

    try {
      const bcrypt = require('bcrypt');
      const userInformation = await this.userMasterService.fetchRecord({ where: { email}, attributes: ['email', 'password']})
      if (!userInformation) {
        return response.status(400).send({ status: 401, data: `Invalid email or password` })
      } else {
        if(await bcrypt.compare(password, userInformation.password)) {
          response.cookie('permission', userInformation.email, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
          })
          response.status(200).send({ status: 200 })
        } else {
          return response.status(400).send({ status: 401, data: `Invalid email or password` })
        }
      }
    } catch (error) {
      response.status(500).send('Internal Server Error')
    }
  }
}
