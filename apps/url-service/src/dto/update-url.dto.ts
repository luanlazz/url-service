import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateURLDto {
  @ApiProperty({
    example: 'Url test',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: 'https://google.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;
}
