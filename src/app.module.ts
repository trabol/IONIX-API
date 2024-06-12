import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';



import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      url:'mysql://root:123456@172.26.0.2:3306/fazt_db',
      type: 'mysql',
      // host: process.env.MYSQLDB_HOST,
      // port: Number(process.env.MYSQLDB_DOCKER_PORT),
      // password: process.env.MYSQLDB_PASSWORD,
      // username: process.env.MYSQLDB_USER,
      // database: process.env.MYSQLDB_DATABASE,
      synchronize: true,
      logging: false,
      entities: [User],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }





