import { TestBed } from '@automock/jest';
import { config as dotenvConfig } from 'dotenv';
import { UrlService } from './url.service';
import { CreateURLDto } from '../dto/create-url.dto';
import { faker } from '@faker-js/faker';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { UrlRepository } from '../repository/url.repository';
import { createUrlEntityMockData } from '../mocks/url.entity.mock';
import { createUrlDTOMockData } from '../mocks/create-url.dto.mock';

dotenvConfig({ path: '.env' });

describe('UrlService', () => {
  let service: UrlService;
  let uniqueIdService: jest.Mocked<UniqueIdService>;
  let urlRepository: jest.Mocked<UrlRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UrlService).compile();

    service = unit;
    uniqueIdService = unitRef.get(UniqueIdService);
    urlRepository = unitRef.get(UrlRepository);

    urlRepository.save.mockReturnValue(
      new Promise((resolve) =>
        resolve(new Promise((resolve) => resolve(createUrlEntityMockData()))),
      ),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a id with length 6', async () => {
    const data: CreateURLDto = createUrlDTOMockData();

    await service.createUrl(data);

    expect(uniqueIdService.generate).toHaveBeenCalledTimes(1);
    expect(uniqueIdService.generate).toHaveBeenCalledWith(6);
  });

  it('should call urlRepository save once', async () => {
    const data: CreateURLDto = createUrlDTOMockData();

    const id = faker.string.uuid();
    jest.spyOn(uniqueIdService, 'generate').mockReturnValue(id);

    await service.createUrl(data);

    expect(urlRepository.save).toHaveBeenCalledTimes(1);
    expect(urlRepository.save).toHaveBeenCalledWith({
      id,
      name: data.name,
      original_url: data.url,
    });
  });

  it('should return the created url', async () => {
    const data: CreateURLDto = createUrlDTOMockData();

    const id = faker.string.uuid();
    jest.spyOn(uniqueIdService, 'generate').mockReturnValue(id);

    const url = await service.createUrl(data);

    const newUrl = `${process.env.BASE_URL}:${process.env.PORT_URL_API}/${id}`;

    expect(url).toHaveProperty('new_url');
    expect(url.new_url).toEqual(newUrl);
  });

  it('should throw an error when id is not found', async () => {
    const id = faker.string.uuid();
    urlRepository.findOne.mockResolvedValue(null);

    expect.assertions(2);

    try {
      await service.findById(id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'URL not found');
    }
  });

  it('should return the original url', async () => {
    const id = faker.string.uuid();
    const urlMock = createUrlEntityMockData();
    urlRepository.findOne.mockResolvedValue(urlMock);

    const url = await service.findById(id);

    expect(url.original_url).toEqual(url.original_url);
  });
});
