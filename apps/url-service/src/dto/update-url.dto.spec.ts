import { validate } from 'class-validator';
import { UpdateURLDto } from './update-url.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationError } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { createUrlDTOMockData } from '../mocks/create-url.dto.mock';

let urlData: UpdateURLDto = new UpdateURLDto();

describe('UpdateURLDto', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    urlData = createUrlDTOMockData();
  });

  it('should be defined', () => {
    const dto = new UpdateURLDto();
    expect(dto).toBeDefined();
  });

  describe('name tests', () => {
    it('should throw an error if name is short', async () => {
      urlData.name = faker.string.alpha(2);
      const myDtoObject = plainToInstance(UpdateURLDto, urlData);

      const errors = await validate(myDtoObject);

      expect(errors.length).toBe(1);
      expect(stringified(errors)).toContain(`name`);
    });

    it('should throw an error if name is long', async () => {
      urlData.name = faker.string.alpha(200);
      const myDtoObject = plainToInstance(UpdateURLDto, urlData);

      const errors = await validate(myDtoObject);

      expect(errors.length).toBe(1);
      expect(stringified(errors)).toContain(`name`);
    });
  });

  describe('URL tests', () => {
    it('should throw an error if url is invalid', async () => {
      urlData.url = faker.string.alpha(3);
      const myDtoObject = plainToInstance(UpdateURLDto, urlData);

      const errors = await validate(myDtoObject);

      expect(errors.length).toBe(1);
      expect(stringified(errors)).toContain(`url`);
    });
  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}
