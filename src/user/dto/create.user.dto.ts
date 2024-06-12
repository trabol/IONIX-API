import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}