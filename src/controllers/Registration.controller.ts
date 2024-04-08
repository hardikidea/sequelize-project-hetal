import { Router, Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import _ from 'lodash';
import { UserMasterService } from '../service';
import { UserMaster } from '../database/models';
import { UniqueConstraintError } from 'sequelize';


class RegistrationController {
  public router: Router;

  private constructor() {
    this.router = Router()
    this.initRoutes()
  }

  private static instance: RegistrationController

  static getInstance(): RegistrationController {
    if (!RegistrationController.instance) {
      RegistrationController.instance = new RegistrationController()
    }
    return RegistrationController.instance
  }

  private constraintForRegistration = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
  ]

  private constraintForLogin = [
    body('email').isEmail().notEmpty().withMessage('Please provide a valid email'),
    body('password').notEmpty().isLength({ min: 8 }) .withMessage('Incorrect password'),
  ]

  private initRoutes(): void {
    this.router.post('/signup', this.constraintForRegistration, this.signUp)
    this.router.post('/login', this.constraintForLogin, this.login)
  }

  async signUp(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body

    if (email && password) {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        const groupedByPath =_.groupBy(errors.array(), 'path');
        const result = _.mapValues(groupedByPath, (group) => group.map((error) => error.msg));
        return response.status(400).json({ validation: result })
      }

      try {
        const postUserInformation: Partial<UserMaster> = { email, password }
        await UserMasterService.getInstance().create(postUserInformation)
        response.status(200).send({ status: 200, data: `[${email}] Registration done successfully.` })
      } catch (error) {
        if(error instanceof UniqueConstraintError) {
          const groupedByPath = _.groupBy(error.errors, 'path')
          const result = _.mapValues(groupedByPath, (group) => group.map((error) => `[${error.value}] already exists in the database`.trim()));
          response.status(400).send({ status: 400, error: result })
        } else {
          response.status(500).send('Internal Server Error')
        }
      }
    } else {
      response.status(400).send({ status: 400, data: `Invalid Request` })
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body

    if (email && password) {
      const errors = validationResult(request)
      if (!errors.isEmpty()) {
        const groupedByPath =_.groupBy(errors.array(), 'path');
        const result = _.mapValues(groupedByPath, (group) => group.map((error) => error.msg));
        return response.status(400).json({ validation: result })
      }

      try {
        const userInformation = await UserMasterService.getInstance().login(email, password)
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
    } else {
      response.status(400).send({ status: 400, data: `Invalid Request` })
    }
  }
}

export default RegistrationController
