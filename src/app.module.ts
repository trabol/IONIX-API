import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';



import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { Drug } from 'src/drugs/entities/drug.entity';
import { Vaccination } from 'src/vaccination/entities/vaccination.entity';



import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { DrugsModule } from './drugs/drugs.module';
import { VaccinationModule } from './vaccination/vaccination.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      //url:'mysql://root:123456@mysqldb:3306/test_db',
      // type: 'mysql',
      // host: process.env.MYSQL_HOST,
      // port: Number(process.env.MYSQL_DOCKER_PORT),
      // password: process.env.MYSQL_PASSWORD,
      // username: process.env.MYSQL_USER,
      // database: process.env.MYSQL_DATABASE,
      type: 'postgres',
      host: `${process.env.DB_HOST}`,
      port: Number(process.env.DB_PORT),
      password: `${process.env.DB_PASS}`,
      username: `${process.env.DB_USER}`,
      database: `${process.env.DB_NAME}`,

      synchronize: true,
      logging: false,
      entities: [User, Drug, Vaccination],
    }),
    UserModule,
    AuthModule,
    DrugsModule,
    VaccinationModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }





