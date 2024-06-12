import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';

//dto
import { CreateUserDto } from 'src/user/dto/create.user.dto';
import { paramsUserDto } from 'src/user/dto/params.user.dto';
//entities 
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password,email,name } = createUserDto;
    const passsHashText =  await hash(password,10);
    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = passsHashText;
    return this.userRepository.save(user);
  }

  findByParams(params: paramsUserDto) {
    return this.userRepository.findOneBy({ ...params });
  }

}
