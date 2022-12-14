import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/role.middleware';
import Roles from '@/roles/roles';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //this.router.get(`${this.path}`, authMiddleware, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, [authMiddleware, rolesmiddleware([Roles.STAFF, Roles.ADMIN])], this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(
      `${this.path}/:id`,
      [authMiddleware, validationMiddleware(CreateUserDto, 'body'), rolesmiddleware([], true)],
      this.usersController.updateUser,
    );
    this.router.delete(`${this.path}/:id`, [authMiddleware, rolesmiddleware([], true)], this.usersController.deleteUser);
  }
}

export default UsersRoute;
