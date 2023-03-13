import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';

import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
