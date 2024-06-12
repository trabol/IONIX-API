import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class LoginAuthDto {

  @IsEmail()
  @MaxLength(100)
  email: string;
 
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  password: string;
}