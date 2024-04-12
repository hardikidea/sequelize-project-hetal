import { NextFunction, Request, Response, Router } from 'express'
import { UserMasterService } from '../service/userMaster.service'
import { ValidationForLoginRequest, ValidationForRegistration } from '@validations/index'
import { ValidateRequests } from '@core/validation'
import { UserMaster } from '@database/models'
import { BaseController } from '@core/base.Controller'
import { Service } from 'typedi'
import { UserTokenMasterService } from '@service/userTokenMaster.service'
import { v4 as uuid } from 'uuid'
import { JWTPayLoad } from 'types/jwt.payload.type'
import { CustomError } from '@utils/CustomError'
import { generateToken } from '@utils/jwt.utils'

@Service()
export class SignupController extends BaseController {
  public router: Router

  constructor(
    private userMasterService: UserMasterService,
    private userTokenMasterService: UserTokenMasterService,
  ) {
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
      if (error instanceof CustomError) {
        response.status(400).send({ status: 400, error: error.message })
      } else {
        response.status(500).send('Internal Server Error')
      }
    }
  }

  login = async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body

    try {
      const bcrypt = require('bcrypt')
      const userInformation = await this.userMasterService.fetchRecord({ where: { email }, attributes: ['id', 'email', 'password'] })
      if (!userInformation) {
        return response.status(400).send({ status: 401, data: `Invalid email or password` })
      } else {
        if (await bcrypt.compare(password, userInformation.password)) {
          const userTokenCreated = await this.userTokenMasterService.createRecord({
            userId: userInformation.id,
            token: uuid(),
            tokenType: 1,
          })
          const jwtBodyPayload: JWTPayLoad = { name: userInformation.email, sessionId: userTokenCreated.token }
          const JWTToken = generateToken(jwtBodyPayload)

          response.cookie('permission', JWTToken, {
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
      // console.log(error)
      response.status(500).send('Internal Server Error')
    }
  }
}
