import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpRedirectResponse,
  Redirect,
  Put,
  Delete,
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUrlDto: CreateURLDto) {
    return this.urlService.updateUrl(id, updateUrlDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.urlService.deleteUrl(id);
  }

  @Get('/list')
  async findAll() {
    return this.urlService.findAll();
  }

  @Get('/list/:urlId')
  async findByUrlId(@Param('urlId') urlId: string) {
    return this.urlService.findById(urlId);
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
