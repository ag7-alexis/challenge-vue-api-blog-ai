import { Category } from '@challenge-vue-api-blog-ai/shared';
import {
  AllowUnauthorizedRequest,
  JwtAuthGuard,
} from '@challenge-vue-api-blog-ai/shared-nest';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';

// @UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('')
  @AllowUnauthorizedRequest()
  findAll(@Query('page') page: number = 0) {
    return this.service.retrieve(page);
  }

  @Get(':uuid')
  @AllowUnauthorizedRequest()
  find(@Param('uuid') uuid: string) {
    return this.service.retrieveOne(uuid);
  }

  @Post()
  create(@Body() categoryCandidate: Partial<Category>) {
    return this.service.create(categoryCandidate);
  }

  @Put(':uuid')
  edit(@Param('uuid') uuid: string, @Body() categoryCandidate) {
    return this.service.update(uuid, categoryCandidate);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.service.delete(uuid);
  }
}
