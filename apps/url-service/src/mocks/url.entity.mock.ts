import { faker } from '@faker-js/faker';
import { Url } from '../entities/url.entity';

export const createUrlEntityMockData = (): Url => {
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(),
    original_url: faker.internet.url(),
    user: null,
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
    deleted_at: null,
  };
};
