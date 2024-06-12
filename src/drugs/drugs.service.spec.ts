import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { DrugsService } from '../drugs/drugs.service';
import { Drug } from '../drugs/entities/drug.entity';
import { CreateDrugDto } from '../drugs/dto/create-drug.dto';
import { UpdateDrugDto } from '../drugs/dto/update-drug.dto';

const mockDrugRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('DrugsService', () => {
  let service: DrugsService;
  let repository: MockRepository<Drug>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DrugsService,
        { provide: getRepositoryToken(Drug), useValue: mockDrugRepository },
      ],
    }).compile();

    service = module.get<DrugsService>(DrugsService);
    repository = module.get<MockRepository<Drug>>(getRepositoryToken(Drug));
  });

  it('should be DrugsService defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a drug', async () => {
    const createDrugDto: CreateDrugDto = {
      name: 'Test Drug',
      approved: true,
      available_at: new Date(),
      max_dose: 100,
      min_dose: 10,
    };

    repository.save.mockResolvedValue({ id: 1, ...createDrugDto });

    const result = await service.create(createDrugDto);
    //expect(result).toEqual({ id: 1, ...createDrugDto });
    expect(mockDrugRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Drug',
      approved: true,
      max_dose: 100,
      min_dose: 10,
    }))
  });

  it('should find all drugs', async () => {
    const drugs = [
      { id: 1, name: 'Drug1', approved: true, available_at: new Date(), max_dose: 100, min_dose: 10 },
      { id: 2, name: 'Drug2', approved: false, available_at: new Date(), max_dose: 200, min_dose: 20 },
    ];

    mockDrugRepository.find.mockResolvedValue(drugs);

    const result = await service.findAll();
    expect(result).toEqual(drugs);
    expect(mockDrugRepository.find).toHaveBeenCalled();
  });

  it('should find one drug', async () => {
    const drug = { id: 1, name: 'Drug1', approved: true, available_at: new Date(), max_dose: 100, min_dose: 10 };

    mockDrugRepository.findOneBy.mockResolvedValue(drug);

    const result = await service.findOne(1);
    expect(result).toEqual(drug);
    expect(mockDrugRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a drug', async () => {
    const updateDrugDto: UpdateDrugDto = {
      name: 'Updated Drug',
      approved: false,
      available_at: new Date(),
      max_dose: 150,
      min_dose: 15,
    };

    mockDrugRepository.update.mockResolvedValue({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    });

    const result = await service.update(1, updateDrugDto);
    expect(result).toEqual({
      "generatedMaps": [],
      "raw": [],
      "affected": 1
    });
    expect(mockDrugRepository.update).toHaveBeenCalledWith(1, updateDrugDto);
  });

  it('should delete a drug', async () => {
    mockDrugRepository.delete.mockResolvedValue({
      "raw": [],
      "affected": 0
    });

    await service.remove(1);
    expect(mockDrugRepository.delete).toHaveBeenCalledWith(1);
  });
});
