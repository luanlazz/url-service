import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../dto/create-user.dto';

export const createUserDTOMockData = (): CreateUserDto => {
  return {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
  };
};
