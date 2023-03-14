import { Post } from '@challenge-vue-api-blog-ai/shared';
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
  Post as HttpPost,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';

// @UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

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

  @HttpPost()
  create(@Body() postCandidate: Partial<Post>) {
    return this.service.create(postCandidate);
  }

  @Put(':uuid')
  edit(@Param('uuid') uuid: string, @Body() postCandidate) {
    return this.service.update(uuid, postCandidate);
  }

  @Get('category/:uuid')
  @AllowUnauthorizedRequest()
  findInCategory(@Param('uuid') uuid: string) {
    return this.service.retrieveInsideCategory(uuid);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.service.delete(uuid);
  }
}
