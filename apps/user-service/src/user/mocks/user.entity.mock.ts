import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';

export const createUserEntityMockData = (): User => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.string.uuid(),
    created_at: faker.date.recent(),
    updated_at: faker.date.recent(),
    deleted_at: faker.date.recent(),
    urls: [],
  };
};
