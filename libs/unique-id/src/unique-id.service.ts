import { Injectable } from '@nestjs/common';
import { init } from '@paralleldrive/cuid2';
import { IUniqueId } from 'libs/unique-id/src/adapter';

@Injectable()
export class UniqueIdService implements IUniqueId {
  generate(): string {
    const length = 14;
    const cuid = init({ length });
    return cuid();
  }
}
