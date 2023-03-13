import { Post } from '@challenge-vue-api-blog-ai/shared';
import { JsonFileStorageService } from '@challenge-vue-api-blog-ai/shared-nest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private readonly storage: JsonFileStorageService) {}

  retrieveOne(uuid: string): Post {
    return this.storage.retrieveOneBy<Post>('post', { uuid });
  }

  retrieve(): Post[] {
    return this.storage.retrieveBy<Post>('post', {});
  }
}
