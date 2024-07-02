import { Injectable } from '@nestjs/common';
import { init } from '@paralleldrive/cuid2';
import { IUniqueId } from 'libs/unique-id/src/adapter';

@Injectable()
export class UniqueIdService implements IUniqueId {
  generate(length: number = 14): string {
    const cuid = init({ length });
    return cuid();
  }
}
