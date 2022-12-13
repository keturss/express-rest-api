import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  public id: string;

  @IsString()
  @IsDefined()
  public pseudo: string;

  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @IsDefined()
  public password: string;

  @IsString()
  @IsOptional()
  public role: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public pseudo: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public password: string;

  @IsString()
  @IsOptional()
  public role: string;
}
