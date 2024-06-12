import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class LoginAuthDto {

  @ApiProperty({
    example: 'userEmail@test.cl',
    required: true
  })
  @IsEmail()
  @MaxLength(100)
  email: string;
 
  @ApiProperty({
    example: 'userPasword',
    required: true
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  password: string;
}