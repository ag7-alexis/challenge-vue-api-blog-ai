import { Category } from '@challenge-vue-api-blog-ai/shared';
import {
  AllowUnauthorizedRequest,
  JwtAuthGuard,
} from '@challenge-vue-api-blog-ai/shared-nest';
import {
  All,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('')
  @AllowUnauthorizedRequest()
  findAll() {
    return this.service.retrieve();
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
}
