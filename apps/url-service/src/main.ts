import { NestFactory } from '@nestjs/core';
import { UrlServiceModule } from './url-service.module';
import { config as dotenvConfig } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenvConfig({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(UrlServiceModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const options = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API to shorten URLs.')
    .setVersion('1.0')
    .addServer(
      `http://localhost:${process.env.PORT_URL_API}/`,
      'Local environment',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT_URL_API);
}
bootstrap();
