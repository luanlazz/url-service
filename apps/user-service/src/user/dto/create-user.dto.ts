import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: 'username',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  username: string;

  @ApiProperty({
    example: 'test@name.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Ab!1234',
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    example: 'Ab!1234',
    required: true,
  })
  @IsNotEmpty()
  confPassword: string;
}
