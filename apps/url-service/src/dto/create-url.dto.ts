import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateURLDto {
  @ApiProperty({
    example: 'Url test',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: 'https://google.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
