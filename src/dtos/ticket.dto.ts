import { Train } from '@/interfaces/train.interface';
import { IsDate, IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsDefined()
  public name: string;

  @IsString()
  @IsDefined()
  public trainId: string;
}
