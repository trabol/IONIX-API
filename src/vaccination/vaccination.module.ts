import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VaccinationService } from './vaccination.service';
import { VaccinationController } from './vaccination.controller';
import { Vaccination } from './entities/vaccination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccination])],
  controllers: [VaccinationController],
  providers: [VaccinationService],
})
export class VaccinationModule { }
