import { NextFunction, Request, Response } from 'express';
import TicketService from '@/services/ticket.service';
import { Ticket } from '@/interfaces/ticket.interface';
import { CreateTicketDto } from '@/dtos/ticket.dto';

class TicketController {
  public TicketService = new TicketService();

  public getTicketAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainFilter: string = req.params.filter;
      const findOneticketData: Ticket[] = await this.TicketService.findTicketAll();

      res.status(200).json({ data: findOneticketData, message: 'all' });
    } catch (error) {
      next(error);
    }
  };

  public getTicketById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const TicketId: string = req.params.id;
      const findOneTicketData: Ticket = await this.TicketService.findTicketById(TicketId);

      res.status(200).json({ data: findOneTicketData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const TicketData: CreateTicketDto = req.body;
      const createTicketData: Ticket = await this.TicketService.createTicket(TicketData);

      res.status(201).json({ data: createTicketData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const TicketId: string = req.params.id;
      const deleteTicketData: Ticket[] = await this.TicketService.deleteTicket(TicketId);

      res.status(200).json({ data: deleteTicketData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TicketController;
