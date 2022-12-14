import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/role.middleware';
import Roles from '@/roles/roles';
import TrainController from '@/controllers/train.controller';
import { CreateTrainDto } from '@/dtos/train.dtos';

class TrainRoute implements Routes {
  public path = '/train';
  public router = Router();
  public usersController = new TrainController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.usersController.getTrainById);
    this.router.post(
      `${this.path}`,
      [authMiddleware, rolesmiddleware([Roles.ADMIN], true), validationMiddleware(CreateTrainDto, 'body')],
      this.usersController.createTrain,
    );
    this.router.put(
      `${this.path}/:id`,
      [authMiddleware, rolesmiddleware([Roles.ADMIN], true), validationMiddleware(CreateTrainDto, 'body')],
      this.usersController.updateTrain,
    );
    this.router.delete(`${this.path}/:id`, [authMiddleware, rolesmiddleware([Roles.ADMIN], true)], this.usersController.deleteTrain);
  }
}

export default TrainRoute;
