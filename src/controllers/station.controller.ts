import { NextFunction, Request, Response } from 'express';
import { CreateStationDto, UpdateStationDto } from '@dtos/station.dto';
import { Station } from '@interfaces/station.interface';
import StationService from '@services/station.service';
import TrainService from '@/services/train.service';
import TicketService from '@/services/ticket.service';
import { Train } from '@/interfaces/train.interface';
import { Ticket } from '@/interfaces/ticket.interface';

class StationController {
  public Stationservice = new StationService();
  public Trainservice = new TrainService();
  public Ticketservice = new TicketService();

  public getStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trainAsc = req.params.asc ? 1 : -1;
      const trainCategorie: string = req.params.categorie;
      const trainLimit: number = +req.params.limit;
      const findAllStationData: Station[] = await this.Stationservice.findAllStation(trainAsc, trainCategorie, trainLimit);

      res.status(200).json({ data: findAllStationData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const StationId: string = req.params.id;
      const findOneStationData: Station = await this.Stationservice.findStationById(StationId);

      res.status(200).json({ data: findOneStationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const StationData: CreateStationDto = req.body;

      const createStationData: Station = await this.Stationservice.createStation(StationData);

      res.status(201).json({ data: createStationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const StationId: string = req.params.id;
      const StationData: UpdateStationDto = req.body;
      console.log(StationId);
      console.log(StationData);
      const updateStationData: Station = await this.Stationservice.updateStation(StationId, StationData);

      res.status(200).json({ data: updateStationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const StationId: string = req.params.id;
      const deleteStationData: Station = await this.Stationservice.deleteStation(StationId);

      const deleteTrainData: Train[] = await this.Trainservice.deleteTrainByStation(deleteStationData._id);

      if (deleteTrainData) {
        await this.Ticketservice.deleteTicketByTrain(deleteTrainData);
      }

      res.status(200).json({ data: deleteStationData, message: 'Station deleted with all ticket and train' });
    } catch (error) {
      next(error);
    }
  };
}

export default StationController;
