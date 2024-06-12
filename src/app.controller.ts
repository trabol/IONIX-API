import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags("main")
@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
