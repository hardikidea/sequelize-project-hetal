// src/controllers/UserController.ts
import { Router, Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/CustomError'
import { SecurityGroupMasterRepository } from '../repository'


class SecurityGroupMasterController {
  public router: Router
  
  private constructor() {
    this.router = Router()
    this.initRoutes()
  }

  private static instance: SecurityGroupMasterController

  static getInstance(): SecurityGroupMasterController {
    if (!SecurityGroupMasterController.instance) {
      SecurityGroupMasterController.instance = new SecurityGroupMasterController()
    }
    return SecurityGroupMasterController.instance
  }

  private initRoutes(): void {
    this.router.get('/', this.getAllSecurityGroupMasterInformation)
    this.router.get('/:id', this.getSecurityGroupMasterById)
    this.router.delete('/:id', this.removeSecurityGroupMasterById)
  }

  async getSecurityGroupMasterById(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id, 0)
    const SecurityGroupMasterInfo = await SecurityGroupMasterRepository.getInstance().find({ where: { id } })

    if (SecurityGroupMasterInfo) {
      res.status(200).json({ status: 200, data: SecurityGroupMasterInfo })
    } else {
      next(new CustomError(404, 'SecurityGroupMaster not found'))
    }
  }

  async removeSecurityGroupMasterById(request: Request, response: Response, next: NextFunction) {
    const id: number = parseInt(request.params.id, 0)
    const isRemoved = await SecurityGroupMasterRepository.getInstance().delete({ where: { id } })

    if (isRemoved) {
      response.status(200).json({ status: 200, data: `SecurityGroupMaster[${id}] removed successfully` })
    } else {
      next(new CustomError(404, 'SecurityGroupMaster not found'))
    }
  }

  async getAllSecurityGroupMasterInformation(request: Request, response: Response, next: NextFunction) {
    if (request.query.page && request.query.limit) {
      const page = parseInt(request.query.page as string, 10) || 1
      const limit = parseInt(request.query.limit as string, 10) || 10
      const offset = (page - 1) * limit

      try {
        const dataItems = await SecurityGroupMasterRepository.getInstance().pagination({ limit, offset })
        response.status(200).send({ ...dataItems, currentPage: page })
      } catch (error) {
        console.error('Error fetching SecurityGroupMasters:', error)
        response.status(500).send('Internal Server Error')
      }
    } else {
      try {
        const SecurityGroupMastersInformation = await SecurityGroupMasterRepository.getInstance().findAll()
        response.status(200).json({ status: 200, data: SecurityGroupMastersInformation })
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

export default SecurityGroupMasterController
