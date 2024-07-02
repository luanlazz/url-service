import { Module } from '@nestjs/common';
import { UrlServiceController } from './url-service.controller';
import { config as dotenvConfig } from 'dotenv';
import { UrlService } from './service/url.service';
import { UniqueIdModule } from 'libs/unique-id/src';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { UrlRepository } from './repository/url.repository';

dotenvConfig({ path: '.env' });

@Module({
  controllers: [UrlServiceController],
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_DIALECT as 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      entities: [Url],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Url]),
    UniqueIdModule,
  ],
  providers: [UrlService, UrlRepository],
})
export class UrlServiceModule {}
