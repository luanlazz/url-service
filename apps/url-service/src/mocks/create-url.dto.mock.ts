import { faker } from '@faker-js/faker';
import { CreateURLDto } from '../dto/create-url.dto';

export const createUrlDTOMockData = (): CreateURLDto => {
  return {
    name: faker.lorem.word(),
    url: faker.internet.url(),
  };
};
