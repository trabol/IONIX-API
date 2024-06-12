import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create.user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findByParams: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signup', () => {
    it('should return conflict if email already exists', async () => {
      const registerDto: CreateUserDto = { email: 'test@example.com', password: 'password' };
      const user = { id: 1, email: 'test@example.com', password: 'password', name: "test" };
      jest.spyOn(userService, 'findByParams').mockResolvedValueOnce(user)

      await expect(authController.signup(registerDto)).rejects.toThrow(new HttpException('email "test@example.com" already exists.', HttpStatus.CONFLICT));
    });

    it('should create a new user successfully', async () => {
      const registerDto: CreateUserDto = { email: 'test@example.com', password: 'password', name: 'test' };
      const user = { id: 1, email: 'test@example.com', password: 'password', name: "test" };
      jest.spyOn(userService, 'findByParams').mockResolvedValueOnce(null);
      jest.spyOn(userService, 'create').mockResolvedValueOnce(user);
      const result = await authController.signup(registerDto);
      expect(result).toEqual({ id: 1, ...registerDto });
    });
  });

  describe('login', () => {
    it('should return not found if email does not exist', async () => {
      const loginDto: LoginAuthDto = { email: 'test@example.com', password: 'password' };
      jest.spyOn(userService, 'findByParams').mockResolvedValueOnce(null);

      await expect(authController.login(loginDto)).rejects.toThrow(new HttpException('email "test@example.com" not  found.', HttpStatus.NOT_FOUND));
    });

    it('should return forbidden if password is incorrect', async () => {
      const loginDto: LoginAuthDto = { email: 'test@example.com', password: 'password' };

      const user = { id: 1, email: 'test@example.com', password: 'passwordIncorrect', name: "test" };
      jest.spyOn(userService, 'findByParams').mockResolvedValueOnce(user);
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValueOnce(false);

      await expect(authController.login(loginDto)).rejects.toThrow(new HttpException('password incorrect.', HttpStatus.FORBIDDEN));
    });

    it('should return a JWT token if credentials are valid', async () => {
      const loginDto: LoginAuthDto = { email: 'test@example.com', password: 'password' };
      const token = 'jwt-token';
      const user = { id: 1, email: 'test@example.com', password: 'password', name: "test" };
      jest.spyOn(userService, 'findByParams').mockResolvedValueOnce(user);
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce(token);
      const result = await authController.login(loginDto);
      expect(result).toEqual(token);
    });
  });
});
