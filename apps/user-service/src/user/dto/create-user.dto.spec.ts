import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationError } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { createUserDTOMockData } from '../mocks/create-user.dto.mock';

let userData: CreateUserDto = new CreateUserDto();

describe('CreateUserDto', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userData = createUserDTOMockData();
  });

  it('should be defined', () => {
    const createUserDto = new CreateUserDto();
    expect(createUserDto).toBeDefined();
  });

  it('should throw an error if name is null', async () => {
    userData.name = null;
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });

  it('should throw an error if name is short', async () => {
    userData.name = faker.string.alpha(1);
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });

  it('should throw an error if name is long', async () => {
    userData.name = faker.string.alpha(200);
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });

  // username tests

  it('should throw an error if username is null', async () => {
    userData.username = null;
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`username`);
  });

  it('should throw an error if username is short', async () => {
    userData.username = faker.string.alpha(3);
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`username`);
  });

  it('should throw an error if username is long', async () => {
    userData.username = faker.string.alpha(51);
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`username`);
  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}
