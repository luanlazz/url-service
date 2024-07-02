import { TestBed } from '@automock/jest';
import { UrlController } from './url.controller';
import { UrlService } from '../service/url.service';
import { createUrlDTOMockData } from '../mocks/create-url.dto.mock';
import { createUrlEntityMockData } from '../mocks/url.entity.mock';

describe('UrlController', () => {
  let controller: UrlController;
  let service: UrlService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UrlController).compile();

    controller = unit;
    service = unitRef.get(UrlService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service createUrl once', async () => {
    const data = createUrlDTOMockData();

    await controller.create(data);

    expect(service.createUrl).toHaveBeenCalledTimes(1);
    expect(service.createUrl).toHaveBeenCalledWith(data);
  });

  it('should return the created url', async () => {
    const data = createUrlDTOMockData();
    const url = { id: '123', name: data.name, original_url: data.url };

    jest.spyOn(service, 'createUrl').mockResolvedValue(url);

    const result = await controller.create(data);

    expect(result).toEqual(url);
  });

  it('should redirect to the original url', async () => {
    const urlMock = createUrlEntityMockData();
    urlMock.id = '123';
    urlMock.original_url = 'https://google.com';

    jest.spyOn(service, 'findById').mockResolvedValue(urlMock);

    const result = await controller.redirect(urlMock.id);

    expect(result).toHaveProperty('url');
    expect(result.url).toEqual(urlMock.original_url);
    expect(result).toHaveProperty('statusCode');
    expect(result.statusCode).toEqual(302);
  });

  it('should call service incrementAccessCount once', async () => {
    const urlMock = createUrlEntityMockData();
    jest.spyOn(service, 'findById').mockResolvedValue(urlMock);

    await controller.redirect(urlMock.id);

    expect(service.incrementAccessCount).toHaveBeenCalledTimes(1);
    expect(service.incrementAccessCount).toHaveBeenCalledWith(urlMock.id);
  });
});
