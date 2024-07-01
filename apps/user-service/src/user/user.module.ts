import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UniqueIdModule } from '@app/unique-id';
import { HashingModule } from 'libs/hashing/src';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UniqueIdModule, HashingModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
