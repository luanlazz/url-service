import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../dto/create-user.dto';

export const createUserDTOMockData = (): CreateUserDto => {
  const password =
    faker.string.alpha({ casing: 'lower' }) +
    faker.string.alpha({ casing: 'upper' }) +
    faker.string.numeric() +
    faker.string.symbol() +
    faker.string.alpha(2);

  return {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    confPassword: password,
  };
};
