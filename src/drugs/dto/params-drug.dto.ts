import {
  IsNumber,
  IsNumberString,
  Min,
} from 'class-validator';

export class ParamsDrugDto {
  @IsNumberString()
  id: number;
}