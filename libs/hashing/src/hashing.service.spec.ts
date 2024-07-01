import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';
import * as bcrypt from 'bcrypt';

describe('HashingService', () => {
  let service: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();

    service = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should hash the data', async () => {
      const data = 'password123';
      const hashedData = await service.hash(data);

      expect(hashedData).not.toEqual(data);
    });
  });

  describe('compare', () => {
    it('should compare the data with the hashed data', async () => {
      const data = 'password123';
      const hashedData = await bcrypt.hash(data, 10);

      const match = await service.compare(data, hashedData);

      expect(match).toBe(true);
    });

    it('should return false if the data does not match the hashed data', async () => {
      const data = 'password123';
      const hashedData = await bcrypt.hash('differentPassword', 10);

      const match = await service.compare(data, hashedData);

      expect(match).toBe(false);
    });
  });
});
