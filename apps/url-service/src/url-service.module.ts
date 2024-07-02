import { Module } from '@nestjs/common';
import { UrlServiceController } from './url-service.controller';
import { UrlService } from './service/url.service';
import { UniqueIdModule } from 'libs/unique-id/src';

@Module({
  controllers: [UrlServiceController],
  imports: [UniqueIdModule],
  providers: [UrlService],
})
export class UrlServiceModule {}
