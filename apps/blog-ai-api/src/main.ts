/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
  };
  app.enableCors(corsOptions);
  // app.enableCors({
  //   origin: ['http://localhost:8080'],
  //   methods: ['POST', 'PUT', 'DELETE', 'GET'],
  // });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     forbidUnknownValues: false,
  //   })
  // );
  app.use(cookieParser());
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
