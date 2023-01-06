import { hash } from 'bcrypt';
import { CreateStationDto, UpdateStationDto } from '@/dtos/station.dto';
import { HttpException } from '@exceptions/HttpException';
import { Station } from '@interfaces/station.interface';
import stationModel from '@models/station.model';
import { isEmpty } from '@utils/util';

class StationService {
  public station = stationModel;

  public async findAllStation(asc: 1 | -1, sortBy: string | 'name' | 'start_stationId' | 'end_stationId', limit: number | 10): Promise<Station[]> {
    const Stations: Station[] = await stationModel
      .find()
      .sort({ [sortBy]: asc })
      .limit(limit);
    return Stations;
  }

  public async findStationById(StationId: string): Promise<Station> {
    if (isEmpty(StationId)) throw new HttpException(400, 'StationId is empty');

    const findStation: Station = await stationModel.findOne({ _id: StationId });
    if (!findStation) throw new HttpException(409, "Station doesn't exist");

    return findStation;
  }

  public async createStation(StationData: CreateStationDto): Promise<Station> {
    if (isEmpty(StationData)) throw new HttpException(400, 'StationData is empty');

    const findStation: Station = await stationModel.findOne({ name: StationData.name });
    if (findStation) throw new HttpException(409, `This Station ${StationData.name} already exists`);

    const createStationData: Station = await stationModel.create({ ...StationData });

    return createStationData;
  }

  public async updateStation(StationId: string, StationData: UpdateStationDto): Promise<Station> {
    if (isEmpty(StationData)) throw new HttpException(400, 'StationData is empty');

    if (StationData.name) {
      const findStation: Station = await stationModel.findOne({ name: StationData.name });
      if (findStation && findStation._id != StationId) throw new HttpException(409, `This name ${StationData.name} already exists`);
    }

    const updateStationById: Station = await stationModel.findByIdAndUpdate(StationId, StationData);
    if (!updateStationById) throw new HttpException(409, "Station doesn't exist");

    return updateStationById;
  }

  public async deleteStation(StationId: string): Promise<Station> {
    const deleteStationById: Station = await stationModel.findByIdAndDelete(StationId);
    if (!deleteStationById) throw new HttpException(409, "Station doesn't exist");

    return deleteStationById;
  }
}

export default StationService;
