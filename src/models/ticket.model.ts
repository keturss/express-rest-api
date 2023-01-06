import { Train } from '@/interfaces/train.interface';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import TrainModel from './train.model';

@modelOptions({ schemaOptions: { collection: 'ticket', timestamps: true } })
class Ticket {
  @prop({ type: String, required: true })
  public name: string;

  @prop({ type: String, required: true })
  public trainId: string;
}

const TicketModel = getModelForClass(Ticket);

export default TicketModel;
