import { TestBed } from '@automock/jest';
import { UrlService } from './url.service';
import { CreateURLDto } from '../dto/create-url.dto';
import { faker } from '@faker-js/faker';
import { UniqueIdService } from '../../../../libs/unique-id/src';

describe('UrlService', () => {
  let service: UrlService;
  let uniqueIdService: jest.Mocked<UniqueIdService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UrlService).compile();

    service = unit;
    uniqueIdService = unitRef.get(UniqueIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a id with length 6', async () => {
    const data: CreateURLDto = {
      name: faker.lorem.words(),
      url: faker.internet.url(),
    };

    service.createUrl(data);

    expect(uniqueIdService.generate).toHaveBeenCalledTimes(1);
    expect(uniqueIdService.generate).toHaveBeenCalledWith(6);
  });
});
