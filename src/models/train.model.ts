import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'train', timestamps: true } })
class Train {
  @prop({ type: String, required: true })
  public name: string;

  @prop({ type: String, required: true })
  public start_station: string;

  @prop({ type: String, required: true })
  public end_station: string;

  @prop({ type: String, required: true })
  public time_of_departure: string;
}

const TrainModel = getModelForClass(Train);

export default TrainModel;
