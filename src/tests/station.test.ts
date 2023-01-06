import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import { CreateStationDto, UpdateStationDto } from '@/dtos/station.dto';
import StationRoute from '@/routes/station.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Station', () => {
  describe('[POST] /station', () => {
    it('response Create Station', async () => {
      const userData: CreateStationDto = {
        name: 'Paris',
        open_hour: '12h',
        close_hour: '18h',
        image: 'ADMIN',
      };

      const stationRoute = new StationRoute();
      const stations = stationRoute.stationController.Stationservice.station;

      stations.findOne = jest.fn().mockReturnValue(null);
      stations.create = jest.fn().mockReturnValue({
        name: 'Paris',
        open_hour: '12h',
        close_hour: '18h',
        image: 'ADMIN',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([stationRoute]);
      return request(app.getServer()).post(`${stationRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /station/:id', () => {
    it('response Update Station Me With Token role', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const userData: UpdateStationDto = {
        id: '60706478aad6c9ad19a31c84',
        name: 'Paris',
        open_hour: '12h',
        close_hour: '18h',
        image: 'test',
      };

      const stationRoute = new StationRoute();
      const stations = stationRoute.stationController.Stationservice.station;

      

      stations.findByIdAndUpdate = jest.fn().mockReturnValue({
        id: userId,
        name: 'Paris',
        open_hour: '12h',
        close_hour: '18h',
        image: 'test',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([stationRoute]);
      return request(app.getServer()).put(`${stationRoute.path}/${userId}`).send(userData);
    });
  });

  
});
