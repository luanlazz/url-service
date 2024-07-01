import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UniqueIdModule } from 'libs/unique-id/src';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UniqueIdModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
