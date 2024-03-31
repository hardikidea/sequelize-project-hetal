import { Router, Request, Response } from 'express'

export class HomeController {
  public router: Router

  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get('/', this.index)
  }

  index(req: Request, res: Response): void {
    res.status(200).json('Hello, World!')
  }
}
