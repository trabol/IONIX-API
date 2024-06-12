import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { paramsUserDto } from 'src/user/dto/params.user.dto';
import * as bcrypt from 'bcrypt';

const mockUserRepository = () => ({
  save: jest.fn(),
  findOneBy: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository() },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should hash the password and save the user', async () => {
      const createUserDto: CreateUserDto = { name: 'John', email: 'john@example.com', password: 'password' };
      const hashedPassword = 'hashedPassword';
      
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      userRepository.save.mockResolvedValue({ id: 1, ...createUserDto, password: hashedPassword });

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      }));
      expect(result).toEqual({ id: 1, ...createUserDto, password: hashedPassword });
    });
  });

  describe('findByParams', () => {
    it('should return a user by params', async () => {
      const params: paramsUserDto = { email: 'john@example.com' };
      const user = { id: 1, name: 'John', email: 'john@example.com', password: 'password' };

      userRepository.findOneBy.mockResolvedValue(user);

      const result = await service.findByParams(params);

      expect(userRepository.findOneBy).toHaveBeenCalledWith(params);
      expect(result).toEqual(user);
    });
  });
});
