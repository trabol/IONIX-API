import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { Vaccination } from './entities/vaccination.entity';

@Injectable()
export class VaccinationService {

  constructor(
    @InjectRepository(Vaccination) private readonly vaccinationRepository: Repository<Vaccination>,
  ) { }

  create(createVaccinationDto: CreateVaccinationDto): Promise<Vaccination> {
    const { date, dose, drug_id, name } = createVaccinationDto;
    const vaccination: Vaccination = new Vaccination();
    vaccination.name = name;
    vaccination.dose = dose;
    vaccination.drug_id = drug_id;
    vaccination.date = date;
    return this.vaccinationRepository.save(vaccination);
  }

  findByDrugId(drug_id: number) {
    return this.vaccinationRepository.findOne({ where: { drug_id, drug: { id: drug_id } }, relations: ['drug'] });
  }

  findAll() {
    return this.vaccinationRepository.find();
  }

  update(id: number, updateVaccinationDto: UpdateVaccinationDto) {
    return this.vaccinationRepository.update(id, updateVaccinationDto);
  }

  remove(id: number) {
    return this.vaccinationRepository.delete(id);
  }
}

