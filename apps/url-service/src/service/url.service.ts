import { Injectable } from '@nestjs/common';
import { CreateURLDto } from '../dto/create-url.dto';
import { Url } from '../entities/url.entity';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { UrlRepository } from '../repository/url.repository';

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly uniqueId: UniqueIdService,
  ) {}

  createUrl(createUrlDTO: CreateURLDto): Promise<Url> {
    const url = new Url();
    url.id = this.uniqueId.generate(6);
    url.name = createUrlDTO.name;
    url.originalUrl = createUrlDTO.url;

    return this.urlRepository.save(url);
  }
}
