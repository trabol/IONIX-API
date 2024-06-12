import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationService } from './vaccination.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccination } from './entities/vaccination.entity';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { Drug } from '../drugs/entities/drug.entity';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';

describe('VaccinationService', () => {
  let service: VaccinationService;
  let repository: Repository<Vaccination>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VaccinationService,
        {
          provide: getRepositoryToken(Vaccination),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VaccinationService>(VaccinationService);
    repository = module.get<Repository<Vaccination>>(getRepositoryToken(Vaccination));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a vaccination', async () => {
    const createDto: CreateVaccinationDto = {
      name: 'Test Vaccination',
      dose: 1,
      drug_id: 1,
      date: new Date(),
    };

    const vaccination = new Vaccination();
    vaccination.name = createDto.name;
    vaccination.dose = createDto.dose;
    vaccination.drug_id = createDto.drug_id;
    vaccination.date = createDto.date;

    jest.spyOn(repository, 'save').mockResolvedValue(vaccination);

    const result = await service.create(createDto);

    expect(result).toEqual(vaccination);
    expect(repository.save).toHaveBeenCalledWith(vaccination);
  });

  it('should find a vaccination by drug_id', async () => {
    const drug_id = 1;
    const vaccination = new Vaccination();
    vaccination.id = 1;
    vaccination.name = 'Test Vaccination';
    vaccination.dose = 1;
    vaccination.drug_id = drug_id;

    jest.spyOn(repository, 'findOne').mockResolvedValue(vaccination);

    const result = await service.findByDrugId(drug_id);

    expect(result).toEqual(vaccination);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { drug_id, drug: { id: drug_id } }, relations: ['drug'] });
  });

  it('should find all vaccinations', async () => {
    const date = new Date("2010-10-10");
    const drug: Drug = new Drug();
    drug.id = 1;
    drug.name = 'Test Drug';
    drug.approved = true;
    drug.available_at = date;
    drug.max_dose = 100;
    drug.min_dose = 10;

    const vaccinations: Vaccination[] = [
      { id: 1, name: 'Vaccination 1', dose: 1, drug_id: 1, date, drug },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(vaccinations);

    const result = await service.findAll();

    expect(result).toEqual(vaccinations);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should update a vaccination', async () => {
    const id = 1;
    const updateDto: UpdateVaccinationDto = { name: 'Updated Vaccination' };
  
    jest.spyOn(repository, 'update').mockResolvedValue({} as any);
  
    const result = await service.update(id, updateDto);
  
    expect(result).toEqual({} as any);
    expect(repository.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('should remove a vaccination', async () => {
    const id = 1;
  
    jest.spyOn(repository, 'delete').mockResolvedValue({} as any);
  
    const result = await service.remove(id);
  
    expect(result).toEqual({} as any);
    expect(repository.delete).toHaveBeenCalledWith(id);
  });

});