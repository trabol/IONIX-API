import { Repository } from 'typeorm';
import { Drug } from './entities/drug.entity';
import { InjectRepository } from '@nestjs/typeorm';


import { Injectable } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';

@Injectable()
export class DrugsService {
  constructor(
    @InjectRepository(Drug) private readonly drugRepository: Repository<Drug>,
  ) { }

  create(createDrugDto: CreateDrugDto): Promise<Drug> {
    const { approved, available_at, max_dose, min_dose, name } = createDrugDto;

    const drug: Drug = new Drug();
    drug.name = name;
    drug.approved = approved;
    drug.available_at = available_at;
    drug.max_dose = max_dose;
    drug.min_dose = min_dose;
    return this.drugRepository.save(drug);
  }

  findAll(): Promise<Drug[]> {
    return this.drugRepository.find();
  }

  findOne(id: number) {
    return this.drugRepository.findOneBy({ id });
  }

  update(id: number, updateDrugDto: UpdateDrugDto) {
    return this.drugRepository.update(id, updateDrugDto);
  }

  remove(id: number) {
    return this.drugRepository.delete(id);
  }
}
