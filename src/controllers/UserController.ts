// src/controllers/UserController.ts
import { Router, Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/CustomError'
import { asyncHandler } from '../utils/asyncHandler'
import { authenticate } from '@middlewares/auth.middleware'
import UserMasterService from '@services/userMaster.service'

class UserController {
  public router: Router

  private constructor(private userMasterService = UserMasterService) {
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
    this.router.get('/users', authenticate, this.getAllUsers)
    this.router.get('/users/:id', authenticate, this.getUserById)
    this.router.delete('/users/:id', authenticate, this.removeUserById)
  }


  getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
     await this.userMasterService.fetchUserAllData();
     res.json(await this.userMasterService.fetchUserAllData());
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    
    const id: number = parseInt(req.params.id, 0);
    const userInfo = await this.userMasterService.fetchUserById(id);

    if (userInfo) {
      res.status(200).json({ status: 200, data: userInfo });
    } else {
      next(new CustomError(404, 'User not found'));
    }
  }

  async removeUserById(req: Request, res: Response, next: NextFunction) {
    
    const id: number = parseInt(req.params.id, 0);
    const isRemoved = await this.userMasterService.removeUserById(id);

    if (isRemoved) {
      res.status(200).json({ status: 200, data: `User[${id}] removed successfully` });
    } else {
      next(new CustomError(404, 'User not found'));
    }
  }
}

export default UserController.getInstance();