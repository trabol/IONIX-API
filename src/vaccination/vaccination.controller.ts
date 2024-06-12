import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Put } from '@nestjs/common';

import { VaccinationService } from './vaccination.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParamsVaccinationDto } from './dto/params-vaccination.dto';


@ApiBearerAuth()
@ApiTags('vaccination')
@Controller('vaccination')
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({
    type: CreateVaccinationDto,
    description: 'Json structure for Vaccination object',
  })
  @Post()
  create(@Body() createVaccinationDto: CreateVaccinationDto) {
    return this.vaccinationService.create(createVaccinationDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.vaccinationService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param() params: ParamsVaccinationDto, @Body() updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationService.update(params.id, updateVaccinationDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param() params: ParamsVaccinationDto) {
    return this.vaccinationService.remove(params.id);
  }
}
