import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashingService } from './adapter';

@Injectable()
export class HashingService implements IHashingService {
  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data, salt);
    return hashPassword;
  }

  async compare(data: string, hashedData: string): Promise<boolean> {
    const match = await bcrypt.compare(data, hashedData);
    return match;
  }
}
