import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { plainToInstance } from 'class-transformer';
import { ValidationError } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('CreateUserDto', () => {
  it('should be defined', () => {
    const createUserDto = new CreateUserDto();
    expect(createUserDto).toBeDefined();
  });

  it('should throw an error if name is null', async () => {
    const userData = {
      name: null,
      username: faker.internet.userName(),
    };
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });

  it('should throw an error if name is short', async () => {
    const userData = {
      name: faker.string.alpha(1),
      username: faker.internet.userName(),
    };
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });

  it('should throw an error if name is long', async () => {
    const userData = {
      name: faker.string.alpha(200),
      username: faker.internet.userName(),
    };
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });

  // username tests

  it('should throw an error if username is null', async () => {
    const userData = {
      name: faker.person.fullName(),
      username: null,
    };
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`username`);
  });

  it('should throw an error if username is short', async () => {
    const userData = {
      name: faker.person.fullName(),
      username: faker.string.alpha(3),
    };
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`username`);
  });

  it('should throw an error if username is long', async () => {
    const userData = {
      name: faker.person.fullName(),
      username: faker.string.alpha(51),
    };
    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`username`);
  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}
