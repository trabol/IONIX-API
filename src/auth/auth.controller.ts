//libreries
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Controller, Post, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

//services
import { UserService } from 'src/user/user.service';
//dto auth
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
//dto user
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { paramsUserDto } from 'src/user/dto/params.user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {

  }

  @Post('/signup')
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
