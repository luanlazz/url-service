import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { UserService } from './user.service';
import { createUserDTOMockData } from './mocks/create-user.dto.mock';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { HashingService } from '../../../../libs/hashing/src';
import { UserRepository } from './user.repository';

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

  it('should call uniqueId service once when creating a user', () => {
    const createUserDto = createUserDTOMockData();
    const uniqueIdSpy = jest
      .spyOn(uniqueId, 'generate')
      .mockReturnValue(faker.string.uuid());

    service.create(createUserDto);

    expect(uniqueIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should call hashing service once when creating a user', () => {
    const createUserDto = createUserDTOMockData();
    const hashingSpy = jest
      .spyOn(hashingService, 'hash')
      .mockReturnValue(new Promise((resolve) => resolve(faker.string.uuid())));

    service.create(createUserDto);

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
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Passwords do not match');
    }
  });
});
