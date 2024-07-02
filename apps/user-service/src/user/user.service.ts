import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UniqueIdService } from '../../../../libs/unique-id/src';
import { HashingService } from '../../../../libs/hashing/src';
import { UserRepository } from './repository/user.repository';

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

  async findAllUser(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find();
    users.map((user) => {
      delete user.password;
      return user;
    });

    return users;
  }

  async findOneById(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    return user;
  }

  async findOneByEmail(email: string): Promise<Partial<User>> {
    const user = await this.userRepository.findByEmail(email);
    delete user.password;
    return user;
  }
}
