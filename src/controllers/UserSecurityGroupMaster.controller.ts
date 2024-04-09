// src/controllers/UserController.ts
import { Router, Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/CustomError'
import { UserSecurityGroupMasterRepository } from '../repository'

class UserSecurityGroupMasterController {
  public router: Router
  
  private constructor() {
    this.router = Router()
    this.initRoutes()
  }

  private static instance: UserSecurityGroupMasterController

  static getInstance(): UserSecurityGroupMasterController {
    if (!UserSecurityGroupMasterController.instance) {
      UserSecurityGroupMasterController.instance = new UserSecurityGroupMasterController()
    }
    return UserSecurityGroupMasterController.instance
  }

  private initRoutes(): void {
    this.router.get('/', this.getAllUserSecurityGroupMasterInformation)
    this.router.get('/:id', this.getUserSecurityGroupMasterById)
    this.router.delete('/:id', this.removeUserSecurityGroupMasterById)
  }

  async getUserSecurityGroupMasterById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id, 0)
    const UserSecurityGroupMasterInfo = await UserSecurityGroupMasterRepository.getInstance().delete(id)

    if (UserSecurityGroupMasterInfo) {
      res.status(200).json({ status: 200, data: UserSecurityGroupMasterInfo })
    } else {
      next(new CustomError(404, 'UserSecurityGroupMaster not found'))
    }
  }

  async removeUserSecurityGroupMasterById(request: Request, response: Response, next: NextFunction) {
    const id: number = parseInt(request.params.id, 0)
    const isRemoved = await UserSecurityGroupMasterRepository.getInstance().delete(id)

    if (isRemoved) {
      response.status(200).json({ status: 200, data: `UserSecurityGroupMaster[${id}] removed successfully` })
    } else {
      next(new CustomError(404, 'UserSecurityGroupMaster not found'))
    }
  }

  async getAllUserSecurityGroupMasterInformation(request: Request, response: Response, next: NextFunction) {
    if (request.query.page && request.query.limit) {
      const page = parseInt(request.query.page as string, 10) || 1
      const limit = parseInt(request.query.limit as string, 10) || 10
      const offset = (page - 1) * limit

      try {
        const dataItems = await UserSecurityGroupMasterRepository.getInstance().pagination({ limit, offset })
        response.status(200).send({ ...dataItems, currentPage: page })
      } catch (error) {
        console.error('Error fetching UserSecurityGroupMasters:', error)
        response.status(500).send('Internal Server Error')
      }
    } else {
      try {
        const UserSecurityGroupMastersInformation = await UserSecurityGroupMasterRepository.getInstance().findAll()
        response.status(200).json({ status: 200, data: UserSecurityGroupMastersInformation })
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

export default UserSecurityGroupMasterController
