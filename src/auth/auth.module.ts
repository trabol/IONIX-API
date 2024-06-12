import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';

import { jwtConstants } from 'src/auth/jwt.constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expire }


    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
