import { TestBed } from '@automock/jest';
import { UrlService } from './url.service';
import { CreateURLDto } from '../dto/create-url.dto';
import { faker } from '@faker-js/faker';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { UrlRepository } from '../repository/url.repository';

describe('UrlService', () => {
  let service: UrlService;
  let uniqueIdService: jest.Mocked<UniqueIdService>;
  let urlRepository: jest.Mocked<UrlRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UrlService).compile();

    service = unit;
    uniqueIdService = unitRef.get(UniqueIdService);
    urlRepository = unitRef.get(UrlRepository);
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

  it('should call urlRepository save once', async () => {
    const data: CreateURLDto = {
      name: faker.lorem.words(),
      url: faker.internet.url(),
    };

    const id = faker.string.uuid();
    jest.spyOn(uniqueIdService, 'generate').mockReturnValue(id);

    await service.createUrl(data);

    expect(urlRepository.save).toHaveBeenCalledTimes(1);
    expect(urlRepository.save).toHaveBeenCalledWith({
      id,
      name: data.name,
      originalUrl: data.url,
    });
  });
});
