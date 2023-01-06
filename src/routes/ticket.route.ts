import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import rolesmiddleware from '@/middlewares/role.middleware';
import Roles from '@/roles/roles';
import TrainController from '@/controllers/train.controller';
import { CreateTicketDto } from '@/dtos/ticket.dto';
import TicketController from '@/controllers/ticket.controller';

class TicketRoute implements Routes {
  public path = '/ticket';
  public router = Router();
  public ticketController = new TicketController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authMiddleware, rolesmiddleware([Roles.ADMIN])], this.ticketController.getTicketAll);
    this.router.get(`${this.path}/:id`, this.ticketController.getTicketById);
    this.router.post(
      `${this.path}`,
      [authMiddleware, rolesmiddleware([Roles.ADMIN]), validationMiddleware(CreateTicketDto, 'body')],
      this.ticketController.createTicket,
    );
    this.router.delete(`${this.path}/:id`, [authMiddleware, rolesmiddleware([Roles.ADMIN], true)], this.ticketController.deleteTicket);
  }
}

export default TicketRoute;
