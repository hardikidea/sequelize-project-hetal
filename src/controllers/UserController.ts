// src/controllers/UserController.ts
import { Router, Request, Response, NextFunction } from 'express'
import { CustomError } from '../utils/CustomError'
import { asyncHandler } from '../utils/asyncHandler'
import { authenticate } from '../middlewares/auth.middleware'
// import { User, users } from '../models/User';

export class UserController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes(): void {
    this.router.get('/users', authenticate, this.getAllUsers)
    this.router.get('/users/:id', authenticate, this.getUserById)

    this.router.get('/users-async', asyncHandler(this.getAllUsersAsync))
    this.router.get('/users-async/:id', asyncHandler(this.getUserByIdAsync))
  }

  getAllUsers(req: Request, res: Response): void {
    // res.json(users);
  }

  getAllUsersAsync = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // // Async logic here
    // res.json(users);
  }

  getUserById(req: Request, res: Response, next: NextFunction): void {
    // const id: number = parseInt(req.params.id, 10);
    // const user: User | undefined = users.find(user => user.id === id);
    // if (user) {
    //   res.json(user);
    // } else {
    //   next(new CustomError('User not found', 404));
    // }
  }

  getUserByIdAsync = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // const id: number = parseInt(req.params.id, 10);
    const user = undefined // users.find(user => user.id === id);

    if (!user) {
      throw new CustomError('User not found', 404)
    }
    res.json(user)
  }
}
