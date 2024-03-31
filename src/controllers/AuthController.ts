// src/controllers/AuthController.ts
import { Router, Request, Response } from 'express'
import { generateToken } from '../utils/jwt.utils'
import logger from '../utils/logger'

export class AuthController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.router.post('/login', this.login)
  }

  private login(req: Request, res: Response): void {
    // For demonstration, normally you'd validate against user credentials in a database
    logger.info(`${req.method} ${req.path}`)
    const { username, password } = req.body
    if (username === 'admin' && password === 'password') {
      const userId = 1 // Example user ID
      const token = generateToken(userId)
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        domain: 'localhost',
        path: '/',
      })
      res.status(200).json({ message: 'Login successful' })
    } else {
      res.status(401).send('Invalid credentials')
    }
  }
}
