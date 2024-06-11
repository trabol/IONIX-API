import { Controller, Post ,HttpException, HttpStatus, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService:UserService,
  ){

  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto,"hola");
    // const exists = await this.userService.findByEmail(createUserDto.email);
    // console.log("hika11",exists);
    // // if(exists){
    // //   throw new HttpException('email already exists.', HttpStatus.CONFLICT);
    // // }
    // // console.log("hika11",exists);
    
    // return await this.userService.create(createUserDto)
    return "hola"
  }

  @Post('login')
  login(){
    return "login";
  }

}
