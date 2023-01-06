import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/role.middleware';
import Roles from '@/roles/roles';
import TrainController from '@/controllers/train.controller';
import { CreateTrainDto, UpdateTrainDto } from '@/dtos/train.dto';

class TrainRoute implements Routes {
  public path = '/train';
  public router = Router();
  public trainController = new TrainController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:asc/:categorie/:limit`, this.trainController.getTrainAll);
    this.router.get(`${this.path}/:id`, this.trainController.getTrainById);
    this.router.post(
      `${this.path}`,
      [authMiddleware, rolesmiddleware([Roles.ADMIN], false), validationMiddleware(CreateTrainDto, 'body')],
      this.trainController.createTrain,
    );
    this.router.put(
      `${this.path}/:id`,
      [authMiddleware, rolesmiddleware([Roles.ADMIN], false), validationMiddleware(UpdateTrainDto, 'body')],
      this.trainController.updateTrain,
    );
    this.router.delete(`${this.path}/:id`, [authMiddleware, rolesmiddleware([Roles.ADMIN], false)], this.trainController.deleteTrain);
  }
}

export default TrainRoute;
