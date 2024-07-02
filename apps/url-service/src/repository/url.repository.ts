import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Url } from '../entities/url.entity';

@Injectable()
export class UrlRepository extends Repository<Url> {
  constructor(private dataSource: DataSource) {
    super(Url, dataSource.createEntityManager());
  }
}
