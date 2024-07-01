import { TestBed } from '@automock/jest';
import { faker } from '@faker-js/faker';
import { UserService } from './user.service';
import { createUserDTOMockData } from './mocks/create-user.dto.mock';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { HashingService } from '../../../../libs/hashing/src';

describe('UserService', () => {
  let service: UserService;
  let uniqueId: jest.Mocked<UniqueIdService>;
  let hashingService: jest.Mocked<HashingService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    uniqueId = unitRef.get(UniqueIdService);
    hashingService = unitRef.get(HashingService);
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
});
