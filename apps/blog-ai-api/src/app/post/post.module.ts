import { OpenAiService, OpenAiServiceImpl } from '@challenge-vue-api-blog-ai/shared-nest';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, {provide: OpenAiService, useFactory: (configService: ConfigService) => (new OpenAiServiceImpl(configService.getOrThrow('OPENAI_KEY'))), inject: [ConfigService]}],
})
export class PostModule {}
