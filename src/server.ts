import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import { HomeController } from './controllers/HomeController'
import { UserController } from './controllers/UserController'
import { CustomError } from './utils/CustomError'
import { Request, Response } from 'express'
import { AuthController } from './controllers/AuthController'
import { requestLoggerMiddleware } from './middlewares/requestLogger.middleware'
import logger from './utils/logger'
import cors from 'cors'
import { ValidateAuthentication } from './database'

export class ServerApplication {
  public expressApp: Express
  public baseRouter: string = '/api'
  constructor() {
    this.expressApp = express()
    ValidateAuthentication(true)
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
    const homeController = new HomeController()
    const userController = new UserController()
    const authController = new AuthController()

    this.expressApp.use(this.getRouterURL('/auth'), authController.router)
    this.expressApp.use(this.getRouterURL('/home'), homeController.router)
    this.expressApp.use(this.getRouterURL('/user'), userController.router)

    // Global error handler
    this.globalErrorHandler(this.expressApp)
  }

  private globalErrorHandler(application: Express): void {
    application.use((err: Error, req: Request, res: Response) => {
      if (err instanceof CustomError) {
        logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
        res.status(err.statusCode).json({ error: err.message })
      } else {
        console.error(err) // For debugging
        // res.status(500).json({ message: 'Internal Server Error' });
        res.status(500).send({ error: err.message || 'An unknown error occurred' })
      }
    })
  }

  private getRouterURL = (router: string): string => {
    return this.baseRouter + router
  }
}
