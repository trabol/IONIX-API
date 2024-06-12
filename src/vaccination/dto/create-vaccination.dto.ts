import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  MaxLength,
  IsNumber,
  IsDate,
  Min,
  Max,
} from 'class-validator';

export class CreateVaccinationDto {

  @ApiProperty({
    example: 'VaccinationName',
    required: true
  })
  @IsString()
  @MaxLength(100)
  name: string

  @ApiProperty({
    example: 1,
    required: true,
    type:Number
  })
  @IsNumber()
  @Min(1)
  @Max(1000)
  dose: number

  @ApiProperty({
    example: "2024-06-15",
    required: true,
    type:Date
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    example: 1,
    required: true,
    type:Number
  })
  @IsNumber()
  drug_id: number
}


