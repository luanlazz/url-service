import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const response = {};

    try {
      const user = await this.userService.create(createUserDto);
      response['status'] = 'success';
      response['data'] = user;
    } catch (error) {
      response['status'] = 'error';
      response['message'] = error.message;
      response['error'] = 'Bad Request';
      response['statusCode'] = 400;
    }

    return response;
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
