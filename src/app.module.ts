import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';



import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { Drug } from 'src/drugs/entities/drug.entity';


import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { DrugsModule } from './drugs/drugs.module';

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
      entities: [User,Drug],
    }),
    UserModule,
    AuthModule,
    DrugsModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }





