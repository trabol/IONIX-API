import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class paramsUserDto {

  id?:number

  @Transform(({ value }) => value.trim())
  @MaxLength(100, { message: 'name allows a maximum of 100 characters.' })
  name?: string;
  
  @Transform(({ value }) => value.trim())
  @MinLength(3, { message: 'email must have atleast 3 characters.' })
  @MaxLength(100, { message: 'The email allows a maximum of 100 characters.' })
  @IsEmail(null, { message: 'Please provide valid Email.' })
  email?: string;


  @Transform(({ value }) => value.trim())
  @MinLength(8, { message: 'Password must contain Minimum 8 and maximum 50 characters,' })
  @MaxLength(50, { message: 'Password must contain Minimum 8 and maximum 50 characters,' })

  password?: string;
}