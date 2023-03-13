import {
  AllowUnauthorizedRequest,
  JwtAuthGuard,
} from '@challenge-vue-api-blog-ai/shared-nest';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
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
}
