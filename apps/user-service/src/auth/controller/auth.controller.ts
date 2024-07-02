import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from '../service/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    type: LoginUserDto,
    description: 'Json structure for url object',
  })
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.signIn(loginUserDto);
  }
}
