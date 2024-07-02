import { LoginUserDto } from '../dto/login-user.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { HashingService } from '../../../../../libs/hashing/src';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(LoginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(
      LoginUserDto.email,
      false,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      !(await this.hashingService.compare(LoginUserDto.password, user.password))
    ) {
      throw new UnauthorizedException();
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
