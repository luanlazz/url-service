import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateURLDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;
}
