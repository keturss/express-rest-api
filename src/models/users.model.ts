import Roles from '@/roles/roles';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { collection: 'users', timestamps: true } })
class User {
  @prop({ type: String, required: true, unique: true })
  public email: string;

  @prop({ type: String, required: true, unique: true })
  public pseudo: string;

  @prop({ type: String, required: true })
  public password: string;

  public createdAt?: Date;

  public updatedAt?: Date;

  @prop({ type: String, required: true, default: Roles.UNKNOWN })
  public role: Roles;
}

const UserModel = getModelForClass(User);

export default UserModel;
