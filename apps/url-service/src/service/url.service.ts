import { Injectable, NotFoundException } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { CreateURLDto } from '../dto/create-url.dto';
import { Url } from '../entities/url.entity';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { UrlRepository } from '../repository/url.repository';

dotenvConfig({ path: '.env' });

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly uniqueId: UniqueIdService,
  ) {}

  async createUrl(createUrlDTO: CreateURLDto): Promise<Partial<Url>> {
    const url = new Url();
    url.id = this.uniqueId.generate(6);
    url.name = createUrlDTO.name;
    url.original_url = createUrlDTO.url;

    const savedUrl = await this.urlRepository.save(url);
    savedUrl.new_url = `${process.env.BASE_URL}:${process.env.PORT_URL_API}/${url.id}`;

    return savedUrl;
  }

  async findById(id: string): Promise<Url> {
    const url = await this.urlRepository.findOne({ where: { id } });
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return url;
  }

  async incrementAccessCount(id: string): Promise<void> {
    await this.urlRepository.increment({ id }, 'access_count', 1);
  }
}
