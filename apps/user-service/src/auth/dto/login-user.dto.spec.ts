import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidationError } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { LoginUserDto } from './login-user.dto';
import { loginUserDTOMockData } from '../mocks/login-user.dto.mock';

let userData: LoginUserDto = new LoginUserDto();

describe('LoginUserDto', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userData = loginUserDTOMockData();
  });

  it('should be defined', () => {
    const createUserDto = new LoginUserDto();
    expect(createUserDto).toBeDefined();
  });

  // email tests

  it('should throw an error if email is null', async () => {
    userData.email = null;
    const myDtoObject = plainToInstance(LoginUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`email`);
  });

  it('should throw an error if email is invalid', async () => {
    userData.email = faker.word.adverb();
    const myDtoObject = plainToInstance(LoginUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`isEmail`);
  });

  // email tests

  it('should throw an error if password is null', async () => {
    userData.password = null;
    const myDtoObject = plainToInstance(LoginUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`password`);
  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}
