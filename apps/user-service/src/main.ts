import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { ValidationPipe } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenvConfig({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const options = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API to users.')
    .setVersion('1.0')
    .addServer(
      `http://localhost:${process.env.PORT_USER_API}/`,
      'Local environment',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT_USER_API);
}
bootstrap();
