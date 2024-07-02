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
import { Public } from '../public.decorator';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Public()
  @Post()
  create(@Body() createUrlDto: CreateURLDto) {
    return this.urlService.createUrl(createUrlDto);
  }

  @Public()
  @Get(':id')
  @Redirect()
  async redirect(@Param('id') id: string) {
    const url = await this.urlService.findById(id);

    await this.urlService.incrementAccessCount(id);

    const response: HttpRedirectResponse = {
      statusCode: 302,
      url: url.original_url,
    };

    return response;
  }
}
