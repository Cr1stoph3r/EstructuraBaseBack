import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const API_URL = configService.get<string>('API_URL') || 'http://localhost:3000';
  const PORT = API_URL.split(':')[2] || 3000;

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  app.enableCors({
    origin: API_URL,
  });

  await app.listen(PORT);
}
bootstrap();
