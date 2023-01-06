import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import TicketModel from '@/models/ticket.model';
import { Ticket } from '@/interfaces/ticket.interface';
import { CreateTicketDto } from '@/dtos/ticket.dto';
import { Train } from '@/interfaces/train.interface';

class TicketService {
  public TicketModel = TicketModel;

  public async findTicketAll(): Promise<Ticket[]> {
    const tickets: Ticket[] = await TicketModel.find();
    return tickets;
  }

  public async findTicketById(TicketId: string): Promise<Ticket> {
    if (isEmpty(TicketId)) throw new HttpException(400, 'TicketId is empty');

    const findTicket: Ticket = await TicketModel.findOne({ _id: TicketId });
    if (!findTicket) throw new HttpException(409, "Ticket doesn't exist");

    return findTicket;
  }

  public async createTicket(TicketData: CreateTicketDto): Promise<Ticket> {
    if (isEmpty(TicketData)) throw new HttpException(400, 'TicketData is empty');

    const findTicket: Ticket = await TicketModel.findOne({ name: TicketData.name });
    if (findTicket) throw new HttpException(409, `This Ticket ${TicketData.name} already exists`);

    const createTicketData: Ticket = await TicketModel.create({ ...TicketData });

    return createTicketData;
  }

  public async deleteTicket(TicketId: string): Promise<Ticket[]> {
    const deleteTicketById: Ticket[] = await TicketModel.findByIdAndDelete(TicketId);
    if (!deleteTicketById) throw new HttpException(409, "Ticket doesn't exist");

    return deleteTicketById;
  }

  public async deleteTicketByTrain(trainArray: Train[]): Promise<void> {
    trainArray.forEach(async train => {
      await TicketModel.deleteMany({ trainId: train._id });
    });
  }
}

export default TicketService;
