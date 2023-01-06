import { Router } from 'express';
import StationController from '@controllers/station.controller';
import { CreateStationDto, UpdateStationDto } from '@dtos/station.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/role.middleware';
import Roles from '@/roles/roles';

class StationRoute implements Routes {
  public path = '/station';
  public router = Router();
  public stationController = new StationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:asc/:categorie/:limit`, [authMiddleware, rolesmiddleware([Roles.ADMIN])], this.stationController.getStation);
    this.router.get(`${this.path}/:id`, [authMiddleware, rolesmiddleware([Roles.STAFF, Roles.ADMIN])], this.stationController.getStationById);
    this.router.post(
      `${this.path}`,
      [authMiddleware, rolesmiddleware([Roles.ADMIN])],
      validationMiddleware(CreateStationDto, 'body'),
      this.stationController.createStation,
    );
    this.router.put(
      `${this.path}/:id`,
      [authMiddleware, rolesmiddleware([Roles.ADMIN]), validationMiddleware(UpdateStationDto, 'body')],
      this.stationController.updateStation,
    );
    this.router.delete(`${this.path}/:id`, [authMiddleware, rolesmiddleware([Roles.ADMIN])], this.stationController.deleteStation);
  }
}

export default StationRoute;
