import { Post } from '@challenge-vue-api-blog-ai/shared';
import {
  AllowUnauthorizedRequest,
  JwtAuthGuard,
} from '@challenge-vue-api-blog-ai/shared-nest';
import {
  Body,
  Controller,
  Get,
  Param,
  Post as HttpPost,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';

@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly service: PostService) {}

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

  @HttpPost()
  create(@Body() postCandidate: Partial<Post>) {
    return this.service.create(postCandidate);
  }

  @Put(':uuid')
  edit(@Param('uuid') uuid: string, @Body() postCandidate) {
    return this.service.update(uuid, postCandidate);
  }
}
