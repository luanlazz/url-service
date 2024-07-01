import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UniqueIdService } from '../../../../libs/unique-id/src';

@Injectable()
export class UserService {
  constructor(private readonly uniqueId: UniqueIdService) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.id = this.uniqueId.generate();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
