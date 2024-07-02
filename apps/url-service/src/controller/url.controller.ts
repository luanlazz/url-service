import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpRedirectResponse,
  Redirect,
} from '@nestjs/common';
import { UrlService } from '../service/url.service';
import { CreateURLDto } from '../dto/create-url.dto';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUrlDto: CreateURLDto) {
    return this.urlService.createUrl(createUrlDto);
  }

  @Get(':id')
  @Redirect()
  async redirect(@Param('id') id: string) {
    const url = await this.urlService.findById(id);
    const response: HttpRedirectResponse = {
      statusCode: 302,
      url: url.original_url,
    };

    return response;
  }
}
