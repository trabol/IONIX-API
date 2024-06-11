import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
   
    const exists = await this.userService.findByEmail(createUserDto.email);
    if(exists){
      throw new HttpException('email already exists.', HttpStatus.CONFLICT);
    }

    return this.userService.create(createUserDto);
  }
}
