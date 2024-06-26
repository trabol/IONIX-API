import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
} from 'class-validator';

export class ParamsDrugDto {
  @ApiProperty({
    example: 1,
    required: true,
    type:Number
  })
  
  @IsNumberString()
  id: number;
}