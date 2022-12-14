import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  @IsOptional()
  public id: string;

  @IsString()
  @IsDefined()
  public name: string;

  @IsEmail()
  @IsDefined()
  public start_station: string;

  @IsString()
  @IsDefined()
  public end_station: string;

  @IsString()
  @IsOptional()
  public time_of_departure: Date;
}

export class UpdateTrainDto {
  @IsString()
  @IsDefined()
  public name: string;

  @IsEmail()
  @IsDefined()
  public start_station: string;

  @IsString()
  @IsDefined()
  public end_station: string;

  @IsString()
  @IsOptional()
  public time_of_departure: string;
}
