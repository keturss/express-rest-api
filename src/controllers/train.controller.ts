import { NextFunction, Request, Response } from 'express';
import TrainService from '@/services/train.service';
import { Train } from '@/interfaces/train.interface';
import { CreateTrainDto, UpdateTrainDto } from '@/dtos/train.dto';

class TrainController {
  public trainService = new TrainService();

  public getTrainAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainAsc = req.params.asc ? 1 : -1;
      const trainCategorie: string = req.params.categorie;
      const trainLimit: number = +req.params.limit;
      const findOnetrainData: Train[] = await this.trainService.findTrainAll(trainAsc, trainCategorie, trainLimit);

      res.status(200).json({ data: findOnetrainData, message: 'all' });
    } catch (error) {
      next(error);
    }
  };

  public getTrainById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainId: string = req.params.id;
      const findOnetrainData: Train = await this.trainService.findTrainById(trainId);

      res.status(200).json({ data: findOnetrainData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTrain = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainData: CreateTrainDto = req.body;
      const createtrainData: Train = await this.trainService.createTrain(trainData);

      res.status(201).json({ data: createtrainData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTrain = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainId: string = req.params.id;
      const trainData: UpdateTrainDto = req.body;
      const updateTrainData: Train = await this.trainService.updateTrain(trainId, trainData);

      res.status(200).json({ data: updateTrainData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTrain = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainId: string = req.params.id;
      const deletetrainData: Train[] = await this.trainService.deleteTrain(trainId);

      res.status(200).json({ data: deletetrainData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TrainController;
