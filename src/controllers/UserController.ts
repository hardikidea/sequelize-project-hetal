// src/controllers/UserController.ts
import { Router, Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/CustomError'
import { UserMasterService } from '../service/userMaster.service'

class UserMasterController {
  public router: Router
  
  private constructor() {
    this.router = Router()
    this.initRoutes()
  }

  private static instance: UserMasterController

  static getInstance(): UserMasterController {
    if (!UserMasterController.instance) {
      UserMasterController.instance = new UserMasterController()
    }
    return UserMasterController.instance
  }

  private initRoutes(): void {
    this.router.get('/', this.getAllUserInformation)
    this.router.get('/:id', this.getUserById)
    this.router.delete('/:id', this.removeUserById)
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id, 0)
    const userInfo = await UserMasterService.getInstance().findById(id)

    if (userInfo) {
      res.status(200).json({ status: 200, data: userInfo })
    } else {
      next(new CustomError(404, 'User not found'))
    }
  }

  async removeUserById(request: Request, response: Response, next: NextFunction) {
    const id: number = parseInt(request.params.id, 0)
    const isRemoved = await UserMasterService.getInstance().delete(id)

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
        const dataItems = await UserMasterService.getInstance().pagination(offset, limit)
        response.status(200).send({ ...dataItems, currentPage: page })
      } catch (error) {
        console.error('Error fetching users:', error)
        response.status(500).send('Internal Server Error')
      }
    } else {
      try {
        const usersInformation = await UserMasterService.getInstance().findAll()
        response.status(200).json({ status: 200, data: usersInformation })
      } catch (error) {
        if(error instanceof CustomError) {
          response.status(error.statusCode).send({ status: error.statusCode, message: error.message})
        } else {
          response.status(500).send(error)
        }
      }
    }
  }
}

export default UserMasterController
