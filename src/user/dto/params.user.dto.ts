import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class paramsUserDto {

  @IsNumber()
  id?:number

  @IsString()
  @MaxLength(100)
  name?: string;

 
  @IsEmail()
  @MaxLength(100)
  email?: string;


  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password?: string;
}