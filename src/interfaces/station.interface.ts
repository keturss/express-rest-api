import { ObjectId } from 'mongoose';

export interface Station {
  _id: string;
  name: string;
  open_hour: string;
  close_hour: string;
  image: string;
}
