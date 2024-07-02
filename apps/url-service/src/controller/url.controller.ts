import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from '../service/url.service';
import { CreateURLDto } from '../dto/create-url.dto';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUrlDto: CreateURLDto) {
    return this.urlService.createUrl(createUrlDto);
  }
}
