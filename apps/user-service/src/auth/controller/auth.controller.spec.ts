import { TestBed } from '@automock/jest';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthController).compile();

    controller = unit;
    service = unitRef.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return access token when user is found', async () => {
    const loginUserDto = { email: 'test@mail.com', password: 'password' };

    await service.signIn(loginUserDto);

    expect(service.signIn).toHaveBeenCalledWith(loginUserDto);
  });
});
