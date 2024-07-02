import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { HashingService } from '../../../../libs/hashing/src';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uniqueId: UniqueIdService,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    if (createUserDto.password !== createUserDto.confPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    if (await this.userRepository.findByEmail(createUserDto.email)) {
      throw new BadRequestException('Email already in use');
    }

    const user: User = new User();

    user.id = this.uniqueId.generate();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = await this.hashingService.hash(createUserDto.password);

    const newUser = await this.userRepository.save(user);

    return (
      newUser &&
      (({ id, name, email, username }) => ({ id, name, email, username }))(
        newUser,
      )
    );
  }

  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
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
