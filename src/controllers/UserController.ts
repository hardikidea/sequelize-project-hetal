// src/controllers/UserController.ts
import { Router, Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/CustomError'

import { AuthenticateMiddleware } from '../middlewares/auth.middleware'
import { UserMasterService } from '../service/userMaster.service'

class UserController {
  public router: Router
  
  private constructor(private userMasterService = UserMasterService.getInstance()) {
    this.router = Router()
    this.initRoutes()
  }

  private static instance: UserController

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController()
    }
    return UserController.instance
  }

  private initRoutes(): void {
    this.router.get('/users', AuthenticateMiddleware, this.getAllUserInformation)
    this.router.get('/users/:id', AuthenticateMiddleware, this.getUserById)
    this.router.delete('/users/:id', AuthenticateMiddleware, this.removeUserById)
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id, 0)
    const userInfo = await this.userMasterService.fetchUserById(id)

    if (userInfo) {
      res.status(200).json({ status: 200, data: userInfo })
    } else {
      next(new CustomError(404, 'User not found'))
    }
  }

  async removeUserById(request: Request, response: Response, next: NextFunction) {
    const id: number = parseInt(request.params.id, 0)
    const isRemoved = await this.userMasterService.removeUserById(id)

    if (isRemoved) {
      response.status(200).json({ status: 200, data: `User[${id}] removed successfully` })
    } else {
      next(new CustomError(404, 'User not found'))
    }
  }

  async getAllUserInformation(request: Request, response: Response, next: NextFunction) {
    if (request.query.page && request.query.limit) {
      const page = parseInt(request.query.page as string, 10) || 1
      const limit = parseInt(request.query.limit as string, 10) || 10
      const offset = (page - 1) * limit

      try {
        const dataItems = await this.userMasterService.fetchUserPagination(offset, limit)
        response.status(200).send({ ...dataItems, currentPage: page })
      } catch (error) {
        console.error('Error fetching users:', error)
        response.status(500).send('Internal Server Error')
      }
    } else {
      await this.userMasterService.fetchUserAllData()
      response.json(await this.userMasterService.fetchUserAllData())
    }
  }
}

export default UserController.getInstance()
