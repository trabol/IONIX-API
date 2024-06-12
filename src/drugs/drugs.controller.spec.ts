import { Test, TestingModule } from '@nestjs/testing';
import { DrugsController } from './drugs.controller';
import { DrugsService } from './drugs.service';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { ParamsDrugDto } from './dto/params-drug.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

describe('DrugsController', () => {
  let controller: DrugsController;
  let service: DrugsService;

  const mockDrugsService = {
    create: jest.fn(dto => {
      return { id: Date.now(), ...dto };
    }),
    findAll: jest.fn(() => {
      return [{ id: 1, name: 'Test Drug' }];
    }),
    update: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
    remove: jest.fn(id => {
      return { id };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugsController],
      providers: [
        {
          provide: DrugsService,
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

    controller = module.get<DrugsController>(DrugsController);
    service = module.get<DrugsService>(DrugsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a drug', async () => {
      const createDrugDto: CreateDrugDto = {
        name: 'Test Drug',
        approved: true,
        available_at: new Date(),
        max_dose: 100,
        min_dose: 10,
      };
      expect(await controller.create(createDrugDto)).toEqual({
        id: expect.any(Number),
        ...createDrugDto,
      });
      expect(service.create).toHaveBeenCalledWith(createDrugDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of drugs', async () => {
      expect(await controller.findAll()).toEqual([{ id: 1, name: 'Test Drug' }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a drug', async () => {
      const params: ParamsDrugDto = { id: 1 };
      const dto: UpdateDrugDto = { name: 'Updated Drug', approved: false };
      expect(await controller.update(params, dto)).toEqual({
        id: 1,
        ...dto,
      });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a drug', async () => {
      const params: ParamsDrugDto = { id: 1 };
      expect(await controller.remove(params)).toEqual({ id: 1 });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});