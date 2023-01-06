import StationRoute from '@/routes/station.route';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'station', timestamps: true } })
class Station {
  @prop({ type: String, required: true, unique: true })
  public name: string;

  @prop({ type: String, required: true })
  public open_hour: string;

  @prop({ type: String, required: true })
  public close_hour: string;

  @prop({ type: String, required: true })
  public image: string;
}

const StationModel = getModelForClass(Station);

export default StationModel;
