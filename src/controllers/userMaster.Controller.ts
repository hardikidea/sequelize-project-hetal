// src/controllers/UserController.ts
import { Request, Response, Router } from 'express'
import { UserMasterService } from '../service/userMaster.service'
import { Service } from 'typedi'


@Service()
export class UserMasterController {
  public router: Router
  
  constructor(private userMasterService: UserMasterService) {
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.router.get('/', this.getAllUserInformation)
    // this.router.get('/:id', validationForId, this.userMasterService.fetchById)
    // this.router.delete('/:id', validationForId, this.userMasterService.deleteRecord)
  }



  // async getUserById(req: Request, res: Response, next: NextFunction) {
  //   const id: number = parseInt(req.params.id, 0)
  //   const userInfo = await this.userMasterService.findOne(id)

  //   if (userInfo) {
  //     res.status(200).json({ status: 200, data: userInfo })
  //   } else {
  //     next(new CustomError(404, 'User not found'))
  //   }
  // }

  // async removeUserById(request: Request, response: Response, next: NextFunction) {
  //   const id: number = parseInt(request.params.id, 0)
  //   const isRemoved = await this.userMasterService.delete(id)

  //   if (isRemoved) {
  //     response.status(200).json({ status: 200, data: `User[${id}] removed successfully` })
  //   } else {
  //     next(new CustomError(404, 'User not found'))
  //   }
  // }

  getAllUserInformation = async (request: Request, response: Response) => {
    if (request.query.page && request.query.limit) {
      const page = parseInt(request.query.page.toString())
      const limit = parseInt(request.query.limit.toString())

      try {
        const dataItems = await this.userMasterService.fetchPagination(page, limit);
        response.status(200).send({ status: 200, data: dataItems})
      } catch (error) {
        console.error('Error fetching users:', error)
        response.status(500).send('Internal Server Error')
      }
    } else {
      try {
        const dataItems = await this.userMasterService.fetchAllRecord({});
        response.status(200).send({ status: 200, data: dataItems})
      } catch (error) {
        console.error('Error fetching users:', error)
        response.status(500).send('Internal Server Error')
      }
    }
  }

  
}

