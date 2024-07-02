import { faker } from '@faker-js/faker';
import { LoginUserDto } from '../dto/login-user.dto';

export const loginUserDTOMockData = (): LoginUserDto => {
  const password =
    faker.string.alpha({ casing: 'lower' }) +
    faker.string.alpha({ casing: 'upper' }) +
    faker.string.numeric() +
    faker.string.symbol() +
    faker.string.alpha(2);

  return {
    email: faker.internet.email(),
    password,
  };
};
