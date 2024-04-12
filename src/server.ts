import 'reflect-metadata'
import express, { Express, NextFunction } from 'express'
import { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'
import logger from './utils/logger'
import { CustomError } from './utils/CustomError'
import { requestLoggerMiddleware } from './middlewares/requestLogger.middleware'
import Container from 'typedi'
import { ValidateAuthentication } from './database'
import { SecurityGroupMasterController, SignupController, UserMasterController } from '@controllers/index'

export class ServerApplication {
  public expressApp: Express
  public baseRouter: string = '/api'

  constructor() {
    this.expressApp = express()
    ValidateAuthentication(false)
    this.mountMiddlewares()
    this.mountRoutes()
  }

  private mountMiddlewares(): void {
    const coreOptions = cors({
      origin: (origin, callback) => {
        if (!origin || process.env.CORS!.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
    })

    this.expressApp.use(coreOptions)
    this.expressApp.use(express.json())
    this.expressApp.use(express.urlencoded({ extended: true }))
    this.expressApp.use(cookieParser())
    this.expressApp.use(morgan('dev'))
    this.expressApp.use(requestLoggerMiddleware)
  }

  private mountRoutes(): void {
    const userMasterController = Container.get(UserMasterController)
    const signupController = Container.get(SignupController)
    const securityGroupMasterController = Container.get(SecurityGroupMasterController)

    this.expressApp.use(this.getRouterURL('/user'), userMasterController.router)
    this.expressApp.use(this.getRouterURL('/securitygroup'), securityGroupMasterController.router)
    this.expressApp.use(this.getRouterURL('/public'), signupController.router)

    // Global error handler
    this.globalErrorHandler(this.expressApp)
  }

  private globalErrorHandler(application: Express): void {
    application.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof CustomError) {
        logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        res.status(err.statusCode).json({ error: err.message })
      } else {
        console.error(err)
        res.status(500).send({ error: 'An unknown error occurred' })
      }
    })
  }

  private getRouterURL = (router: string): string => {
    return this.baseRouter + router
  }
}
