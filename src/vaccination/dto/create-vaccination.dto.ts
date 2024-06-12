import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
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
    example: true,
    required: true
  })
  @IsBoolean()
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
