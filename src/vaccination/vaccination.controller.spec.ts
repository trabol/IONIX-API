import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationController } from './vaccination.controller';
import { VaccinationService } from './vaccination.service';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { Drug } from '../drugs/entities/drug.entity';


describe('VaccinationController', () => {
  let controller: VaccinationController;
  let service: VaccinationService;

  const mockDrugsService = {
    findByDrugId: jest.fn(),
    create:jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationController],
      providers: [
        {
          provide: VaccinationService,
          useValue: mockDrugsService,
        },
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<VaccinationController>(VaccinationController);
    service = module.get<VaccinationService>(VaccinationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw 404 if drug_id is not found', async () => {
    const date = new Date("2024-06-15")
    const createDto: CreateVaccinationDto = {
      name: "test",
      drug_id: 1,
      dose: 2,
      date
    };

    jest.spyOn(service, 'findByDrugId').mockResolvedValue(null);

    await expect(controller.create(createDto)).rejects.toThrowError(
      new HttpException(`drug_id "${createDto.drug_id}" not found.`, HttpStatus.NOT_FOUND),
    );
  });

  it('should throw 409 if drug is not approved', async () => {
    const date = new Date("2024-06-15")
    const createDto: CreateVaccinationDto = {
      name: "test",
      drug_id: 1,
      dose: 2,
      date,
    };

    const mockDrug = {
      drug: {
        approved: false,
        name: 'Test Drug',
      },
    };

    jest.spyOn(service, 'findByDrugId').mockResolvedValue(mockDrug as any);

    await expect(controller.create(createDto)).rejects.toThrowError(
      new HttpException(`drug "${mockDrug.drug.name}" not approved.`, HttpStatus.CONFLICT),
    );
  });
  
  it('should throw 409 if dose is not within allowed range', async () => {
    const date = new Date("2024-06-15")
    const createDto: CreateVaccinationDto = {
      name: "test",
      drug_id: 1,
      dose: 2,
      date,
    };

    const mockDrug = {
      drug: {
        min_dose: 100,
        max_dose: 300,
        approved: true,
        name: 'Test Drug',
      },
    };

    jest.spyOn(service, 'findByDrugId').mockResolvedValue(mockDrug as any);

    await expect(controller.create(createDto)).rejects.toThrowError(
      new HttpException(`dose is not within the allowed range, between(${mockDrug.drug.min_dose},${mockDrug.drug.max_dose}).`, HttpStatus.CONFLICT),
    );
  });

  it('should throw 409 if date vaccination is not later than drug available_at', async () => {
    const date = new Date("2024-06-15")
    const createDto: CreateVaccinationDto = {
      name: "test",
      drug_id: 1,
      dose: 200,
      date,
    };

    const mockDrug = {
      drug: {
        id:1,
        name: 'Test Drug',
        approved: true,
        available_at: new Date("2025-06-15"),
        max_dose: 300,
        min_dose: 100,
      },
    };

    jest.spyOn(service, 'findByDrugId').mockResolvedValue(mockDrug as any);

    await expect(controller.create(createDto)).rejects.toThrowError(
      new HttpException(`date vaccination should be later than available at drug".`, HttpStatus.CONFLICT),
    );
  });
});
