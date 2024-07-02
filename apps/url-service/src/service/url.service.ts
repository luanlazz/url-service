import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { CreateURLDto } from '../dto/create-url.dto';
import { Url } from '../entities/url.entity';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { UrlRepository } from '../repository/url.repository';
import { REQUEST } from '@nestjs/core';
import { UpdateURLDto } from '../dto/update-url.dto';

dotenvConfig({ path: '.env' });

@Injectable({ scope: Scope.REQUEST })
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly uniqueId: UniqueIdService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async createUrl(createUrlDTO: CreateURLDto): Promise<Partial<Url>> {
    const url = new Url();
    url.id = this.uniqueId.generate(6);
    url.name = createUrlDTO.name;
    url.original_url = createUrlDTO.url;

    if (this.request['user']) {
      url.user = this.request['user']?.sub;
    }

    const savedUrl = await this.urlRepository.save(url);
    savedUrl.new_url = this.makeRedirectUrl(url);

    return savedUrl;
  }

  async updateUrl(
    id: string,
    updateUrlDTO: UpdateURLDto,
  ): Promise<Partial<Url>> {
    const url = await this.findById(id);

    url.name = updateUrlDTO.name;
    url.original_url = updateUrlDTO.url;

    const updatedUrl = await this.urlRepository.save(url);
    updatedUrl.new_url = this.makeRedirectUrl(url);

    return updatedUrl;
  }

  async deleteUrl(id: string): Promise<Partial<Url>> {
    const url = await this.findById(id);

    url.deleted_at = new Date();

    const updatedUrl = await this.urlRepository.save(url);

    return updatedUrl;
  }

  async findById(id: string): Promise<Url> {
    const userId = this.request['user']?.sub || null;

    const url = await this.urlRepository.findOne({
      where: { id, user: userId },
    });
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return url;
  }

  async findAll(): Promise<Url[]> {
    const userId = this.request['user']?.sub;
    if (!userId) {
      throw new UnauthorizedException();
    }

    const urls = await this.urlRepository.find({ where: { user: userId } });
    return urls.map((url) => {
      url.new_url = this.makeRedirectUrl(url);
      return url;
    });
  }

  async incrementAccessCount(id: string): Promise<void> {
    await this.urlRepository.increment({ id }, 'access_count', 1);
  }

  makeRedirectUrl(url: Url): string {
    return `${process.env.BASE_URL}:${process.env.PORT_URL_API}/${url.id}`;
  }
}
