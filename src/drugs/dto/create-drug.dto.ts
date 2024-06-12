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

export class CreateDrugDto {

  @ApiProperty({
    example: 'DrugName',
    required: true
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: true,
    required: true
  })
  @IsBoolean()
  approved: boolean;

  @ApiProperty({
    example: 1,
    required: true,
    type:Number

  })
  @IsNumber()
  @Min(1)
  @Max(1000)
  min_dose: number;

  @ApiProperty({
    example: 100,
    required: true,
    type:Number
  })
  @IsNumber()
  @Min(1)
  @Max(1000)
  max_dose: number;

  @ApiProperty({
    example: "2024-06-15",
    required: true,
    type:Date
  })

  @IsDate()
  @Type(() => Date)
  available_at: Date;

}
