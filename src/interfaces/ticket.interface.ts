import { ObjectId } from 'mongoose';

export interface Ticket {
  _id: string;
  name: string;
  trainId: string;
}
