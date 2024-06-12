import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class ParamsVaccinationDto {
  @ApiProperty({
    example: 1,
    required: true,
    type:Number
  })
  @IsNumberString()
  id: number;

  
}