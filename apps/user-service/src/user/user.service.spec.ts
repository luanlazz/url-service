import { UniqueIdService } from '../../../../libs/unique-id/src';
import { UserService } from './user.service';
import { TestBed } from '@automock/jest';
import { createUserDTOMockData } from './mocks/create-user.dto.mock';
import { faker } from '@faker-js/faker';

describe('UserService', () => {
  let service: UserService;
  let uniqueId: jest.Mocked<UniqueIdService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    service = unit;
    uniqueId = unitRef.get(UniqueIdService);
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
});
