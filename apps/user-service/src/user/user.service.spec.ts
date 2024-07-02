import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { UserService } from './user.service';
import { createUserDTOMockData } from './mocks/create-user.dto.mock';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { HashingService } from '../../../../libs/hashing/src';
import { UserRepository } from './repository/user.repository';
import { BadRequestException } from '@nestjs/common';
import { createUserEntityMockData } from './mocks/user.entity.mock';

describe('UserService', () => {
  let service: UserService;
  let uniqueId: jest.Mocked<UniqueIdService>;
  let hashingService: jest.Mocked<HashingService>;
  let database: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    uniqueId = unitRef.get(UniqueIdService);
    hashingService = unitRef.get(HashingService);
    database = unitRef.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call uniqueId service once when creating a user', async () => {
    const createUserDto = createUserDTOMockData();
    const uniqueIdSpy = jest
      .spyOn(uniqueId, 'generate')
      .mockReturnValue(faker.string.uuid());

    await service.create(createUserDto);

    expect(uniqueIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should call hashing service once when creating a user', async () => {
    const createUserDto = createUserDTOMockData();
    const hashingSpy = jest
      .spyOn(hashingService, 'hash')
      .mockReturnValue(new Promise((resolve) => resolve(faker.string.uuid())));

    await service.create(createUserDto);

    expect(hashingSpy).toHaveBeenCalledTimes(1);
  });

  it('should call database save once when creating a user', async () => {
    const createUserDto = createUserDTOMockData();
    const databaseSpy = jest.spyOn(database, 'save').mockReturnValue(
      new Promise((resolve) =>
        resolve({
          ...createUserDto,
          id: faker.string.uuid(),
          created_at: faker.date.recent(),
          updated_at: faker.date.recent(),
          deleted_at: null,
        }),
      ),
    );

    await service.create(createUserDto);

    expect(databaseSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when passwords do not match', async () => {
    const createUserDto = createUserDTOMockData();
    createUserDto.password = 'password';
    createUserDto.confPassword = 'password1';

    expect.assertions(2);

    try {
      await service.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error).toHaveProperty('message', 'Passwords do not match');
    }
  });

  it('should throw an error when email already in use', async () => {
    const createUserDto = createUserDTOMockData();

    jest.spyOn(database, 'findByEmail').mockReturnValue(
      new Promise((resolve) =>
        resolve(
          new Promise((resolve) =>
            resolve({
              ...createUserDto,
              id: faker.string.uuid(),
              created_at: faker.date.recent(),
              updated_at: faker.date.recent(),
              deleted_at: null,
            }),
          ),
        ),
      ),
    );

    expect.assertions(2);

    try {
      await service.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error).toHaveProperty('message', 'Email already in use');
    }
  });

  it('should return all users when findAllUser is called', async () => {
    const users = [
      createUserEntityMockData(),
      createUserEntityMockData(),
      createUserEntityMockData(),
    ];

    jest
      .spyOn(database, 'find')
      .mockReturnValue(new Promise((resolve) => resolve(users)));

    const response = await service.findAllUser();

    expect(response).toHaveLength(3);
  });

  it('should return a user when findOneById is called', async () => {
    const user = createUserEntityMockData();

    jest
      .spyOn(database, 'findOneBy')
      .mockReturnValue(new Promise((resolve) => resolve(user)));

    const response = await service.findOneById(user.id);

    expect(response).toEqual(user);
    expect(response).not.toHaveProperty('password');
  });

  it('should return a user with pass when findOneById is called with hidePass set to false', async () => {
    const user = createUserEntityMockData();

    jest
      .spyOn(database, 'findOneBy')
      .mockReturnValue(new Promise((resolve) => resolve(user)));

    const response = await service.findOneById(user.id, false);

    expect(response).toEqual(user);
    expect(response).toHaveProperty('password');
  });

  it('should return a user when findOneByEmail is called', async () => {
    const user = createUserEntityMockData();

    jest
      .spyOn(database, 'findByEmail')
      .mockReturnValue(new Promise((resolve) => resolve(user)));

    const response = await service.findOneByEmail(user.email);

    expect(response).toEqual(user);
    expect(response).not.toHaveProperty('password');
  });

  it('should return a user with pass when findOneByEmail is called with hidePass set to false', async () => {
    const user = createUserEntityMockData();

    jest
      .spyOn(database, 'findByEmail')
      .mockReturnValue(new Promise((resolve) => resolve(user)));

    const response = await service.findOneByEmail(user.email, false);

    expect(response).toEqual(user);
    expect(response).toHaveProperty('password');
  });
});
