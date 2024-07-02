import { NestFactory } from '@nestjs/core';
import { UrlServiceModule } from './url-service.module';
import { config as dotenvConfig } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenvConfig({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(UrlServiceModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT_URL_API);
}
bootstrap();
