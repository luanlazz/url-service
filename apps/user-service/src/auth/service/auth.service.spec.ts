import { AuthService } from './auth.service';
import { TestBed } from '@automock/jest';
import { HashingService } from '../../../../../libs/hashing/src';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createUserEntityMockData } from '../../user/mocks/user.entity.mock';

describe('AuthService', () => {
  let service: AuthService;
  let hashingService: jest.Mocked<HashingService>;
  let usersService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    service = unit;
    hashingService = unitRef.get(HashingService);
    usersService = unitRef.get(UserService);
    jwtService = unitRef.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw not found exception when user not found', async () => {
    const loginUserDto = { email: 'test@mail.com', password: 'password' };

    usersService.findOneByEmail.mockResolvedValue(null);

    expect.assertions(2);

    try {
      await service.signIn(loginUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error).toHaveProperty('message', 'User not found');
    }
  });

  it('should throw unauthorized exception when password does not match', async () => {
    const loginUserDto = { email: 'test@mail.com', password: 'password' };
    usersService.findOneByEmail.mockResolvedValue(createUserEntityMockData());
    hashingService.compare.mockResolvedValue(false);

    expect.assertions(1);

    try {
      await service.signIn(loginUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it('should return access token when user is found', async () => {
    const loginUserDto = { email: 'test@mail.com', password: 'password' };
    usersService.findOneByEmail.mockResolvedValue(createUserEntityMockData());
    hashingService.compare.mockResolvedValue(true);
    jwtService.signAsync.mockResolvedValue('token');

    const token = await service.signIn(loginUserDto);

    expect(token).toHaveProperty('access_token');
    expect(token.access_token).toEqual('token');
    expect(jwtService.signAsync).toHaveBeenCalled();
  });
});
