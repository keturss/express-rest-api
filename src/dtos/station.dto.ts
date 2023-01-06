import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateStationDto {
  @IsString()
  @IsDefined()
  public name: string;

  @IsString()
  @IsDefined()
  public open_hour: string;

  @IsString()
  @IsDefined()
  public close_hour: string;

  @IsDefined()
  public image: string;
}

export class UpdateStationDto {

  @IsString()
  @IsOptional()
  public id: string;

  
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public open_hour: string;

  @IsString()
  @IsOptional()
  public close_hour: string;

  @IsOptional()
  public image: string;
}
