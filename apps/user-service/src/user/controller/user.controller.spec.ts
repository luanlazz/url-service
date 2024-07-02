import { UserController } from './user.controller';
import { TestBed } from '@automock/jest';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const { unit } = TestBed.create(UserController).compile();

    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
