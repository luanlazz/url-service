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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateURLDto } from '../dto/update-url.dto';

@ApiTags('URL')
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Public()
  @Post()
  @ApiBody({
    type: CreateURLDto,
    description: 'Json structure for url object',
  })
  create(@Body() createUrlDto: CreateURLDto) {
    return this.urlService.createUrl(createUrlDto);
  }

  @Put(':id')
  @ApiBody({
    type: UpdateURLDto,
    description: 'Json structure for url object',
  })
  async update(@Param('id') id: string, @Body() updateUrlDto: UpdateURLDto) {
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
