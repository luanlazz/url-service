import { TestBed } from '@automock/jest';
import { UrlController } from './url.controller';
import { UrlService } from '../service/url.service';

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
    const data = { name: 'test', url: 'http://test.com' };

    await controller.create(data);

    expect(service.createUrl).toHaveBeenCalledTimes(1);
    expect(service.createUrl).toHaveBeenCalledWith(data);
  });
});
