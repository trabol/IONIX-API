import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

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
      logging: true,
      entities: [User], // <----
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }





