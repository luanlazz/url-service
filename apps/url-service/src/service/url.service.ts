import { Injectable } from '@nestjs/common';
import { CreateURLDto } from '../dto/create-url.dto';
import { Url } from '../entities/url.entity';
import { UniqueIdService } from '../../../../libs/unique-id/src';

@Injectable()
export class UrlService {
  constructor(private readonly uniqueId: UniqueIdService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createUrl(createUrlDTO: CreateURLDto): Promise<Url> {
    this.uniqueId.generate(6);

    return null;
  }
}
