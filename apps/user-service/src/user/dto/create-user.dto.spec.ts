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
    };

    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });

  it('should throw an error if name is short', async () => {
    const userData = {
      name: faker.string.alpha(1),
    };

    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });

  it('should throw an error if name is short', async () => {
    const userData = {
      name: faker.string.alpha(200),
    };

    const myDtoObject = plainToInstance(CreateUserDto, userData);

    const errors = await validate(myDtoObject);

    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`name`);
  });
});

export function stringified(errors: ValidationError[]): string {
  return JSON.stringify(errors);
}
