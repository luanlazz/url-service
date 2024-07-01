import { Test, TestingModule } from '@nestjs/testing';
import { UniqueIdService } from './unique-id.service';

describe('UniqueIdLibService', () => {
  let service: UniqueIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueIdService],
    }).compile();

    service = module.get<UniqueIdService>(UniqueIdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a random ID', () => {
    const id = service.generate();
    const regex = /^[a-zA-Z0-9_-]{7,14}$/;
    expect(regex.test(id)).toBe(true);
  });

  it('should generate unique ID', () => {
    const id1 = service.generate();
    const id2 = service.generate();
    expect(id1).not.toBe(id2);
  });

  it('should generate different IDs on subsequent calls', () => {
    const id1 = service.generate();
    const id2 = service.generate();
    const id3 = service.generate();
    expect(id1).not.toBe(id2);
    expect(id2).not.toBe(id3);
    expect(id1).not.toBe(id3);
  });
});
