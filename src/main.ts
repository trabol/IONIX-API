import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from 'src/app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('ionix api')
  .setDescription('text api')
  .setVersion('1.0')
  .addTag('main')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  
  console.log("NODE_PORT",process.env.NODE_PORT);
  
  await app.listen(process.env.NODE_PORT);
}
bootstrap();
