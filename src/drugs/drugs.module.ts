import { Module } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { DrugsController } from './drugs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from 'src/drugs/entities/drug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drug])],
  controllers: [DrugsController],
  providers: [DrugsService],
  exports: [DrugsService,]
})
export class DrugsModule { }


