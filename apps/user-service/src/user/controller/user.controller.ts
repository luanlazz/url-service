import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for url object',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
}
