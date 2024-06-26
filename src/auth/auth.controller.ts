//libreries
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Controller, Post, HttpException, HttpStatus, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//services
import { UserService } from '../user/user.service';
//dto auth
import { LoginAuthDto } from './dto/login-auth.dto';
//dto user
import { CreateUserDto } from '../user/dto/create.user.dto';
import { paramsUserDto } from '../user/dto/params.user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {

  }

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() register: CreateUserDto) {
    const { email } = register;
    const params: paramsUserDto = { email };
    const exists = await this.userService.findByParams(params);
    if (exists) {
      throw new HttpException(`email "${email}" already exists.`, HttpStatus.CONFLICT);
    }
    return await this.userService.create(register)
  }


  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginAuthDto) {
    const { email, password } = loginDto;
    let params: paramsUserDto = { email };
    const findUser = await this.userService.findByParams(params);
    if (!findUser) {
      throw new HttpException(`email "${email}" not  found.`, HttpStatus.NOT_FOUND);
    }
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) {
      throw new HttpException(`password incorrect.`, HttpStatus.FORBIDDEN);
    }
    const payload = { id: findUser.id, email: findUser.email };

    
    return this.jwtService.sign(payload);

  }


}
