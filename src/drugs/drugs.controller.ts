import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UsePipes, Put, UseGuards } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { ParamsDrugDto } from './dto/params-drug.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('drugs')
@Controller('drugs')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) { }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({
    type: CreateDrugDto,
    description: 'Json structure for drug object',
  })
  create(@Body() createDrugDto: CreateDrugDto) {
    return this.drugsService.create(createDrugDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.drugsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param() params: ParamsDrugDto, @Body() updateDrugDto: UpdateDrugDto) {
    return this.drugsService.update(params.id, updateDrugDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  remove(@Param() params: ParamsDrugDto) {
    return this.drugsService.remove(params.id);
  }
}
