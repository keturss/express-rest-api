import { IsDate, IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  @IsDefined()
  public name: string;

  @IsString()
  @IsDefined()
  public start_stationId: string;

  @IsString()
  @IsDefined()
  public end_stationId: string;

  @IsString()
  @IsDefined()
  public time_of_departure: string;
}

export class UpdateTrainDto {
  @IsString()
  @IsDefined()
  public name: string;

  @IsString()
  @IsDefined()
  public start_stationId: string;

  @IsString()
  @IsDefined()
  public end_stationId: string;

  @IsString()
  @IsDefined()
  public time_of_departure: string;
}
