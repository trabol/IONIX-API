import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body,  Param, Delete, UseGuards, UsePipes, ValidationPipe, Put, HttpStatus, HttpException } from '@nestjs/common';

import { VaccinationService } from './vaccination.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { ParamsVaccinationDto } from './dto/params-vaccination.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@ApiBearerAuth()
@ApiTags('vaccination')
@Controller('vaccination')
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({
    type: CreateVaccinationDto,
    description: 'Json structure for Vaccination object',
  })
  @Post()
  async create(@Body() createVaccinationDto: CreateVaccinationDto) {
    const { drug_id, dose, date } = createVaccinationDto;
    const findDrug = await this.vaccinationService.findByDrugId(drug_id);
    if (!findDrug) {
      throw new HttpException(`drug_id "${drug_id}" not found.`, HttpStatus.NOT_FOUND);
    }
    const { approved, available_at, max_dose, min_dose, name } = findDrug.drug;
    //droga no esta permitida
    if (!approved) {
      throw new HttpException(`drug "${name}" not approved.`, HttpStatus.CONFLICT);
    }
    //dosis dentro del rango
    if (dose < min_dose || dose > max_dose) {
      throw new HttpException(`dose is not within the allowed range, between(${min_dose},${max_dose}).`, HttpStatus.CONFLICT);
    }
    //fecha de droga es posterior
    const date1 = new Date(date);
    const availableAt1 = new Date(available_at);
    if (date1 <= availableAt1) {
      throw new HttpException(`date vaccination should be later than available at drug".`, HttpStatus.CONFLICT);
    }
    return this.vaccinationService.create(createVaccinationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.vaccinationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param() params: ParamsVaccinationDto, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    const { drug_id } = updateVaccinationDto;
    const findDrug = await this.vaccinationService.findByDrugId(drug_id);
    if (!findDrug) {
      throw new HttpException(`drug_id "${drug_id}" not found.`, HttpStatus.NOT_FOUND);
    }
    return this.vaccinationService.update(params.id, updateVaccinationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param() params: ParamsVaccinationDto) {
    return this.vaccinationService.remove(params.id);
  }
}
