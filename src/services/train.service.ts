import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import TrainModel from '@/models/train.model';
import { Train } from '@/interfaces/train.interface';
import { CreateTrainDto, UpdateTrainDto } from '@/dtos/train.dtos';

class TrainService {
  public trains = TrainModel;

  public async findTrainById(trainId: string): Promise<Train> {
    if (isEmpty(trainId)) throw new HttpException(400, 'trainId is empty');

    const findTrain: Train = await TrainModel.findOne({ _id: trainId });
    if (!findTrain) throw new HttpException(409, "Train doesn't exist");

    return findTrain;
  }

  public async createTrain(trainData: CreateTrainDto): Promise<Train> {
    if (isEmpty(trainData)) throw new HttpException(400, 'trainData is empty');

    const findTrain: Train = await TrainModel.findOne({ name: trainData.name });
    if (findTrain) throw new HttpException(409, `This train ${trainData.name} already exists`);

    const createTrainData: Train = await TrainModel.create({ ...trainData });

    return createTrainData;
  }

  public async updateTrain(trainId: string, trainData: UpdateTrainDto): Promise<Train> {
    if (isEmpty(trainData)) throw new HttpException(400, 'trainData is empty');

    if (trainData.name) {
      const findTrain: Train = await TrainModel.findOne({ name: trainData.name });
      if (findTrain && findTrain._id != trainId) throw new HttpException(409, `This name ${trainData.name} already exists`);
    }

    const updateTrainById: Train = await TrainModel.findByIdAndUpdate(trainId, trainData);
    if (!updateTrainById) throw new HttpException(409, "Train doesn't exist");

    return updateTrainById;
  }

  public async deleteTrain(trainId: string): Promise<Train> {
    const deleteTrainById: Train = await TrainModel.findByIdAndDelete(trainId);
    if (!deleteTrainById) throw new HttpException(409, "Train doesn't exist");

    return deleteTrainById;
  }
}

export default TrainService;
