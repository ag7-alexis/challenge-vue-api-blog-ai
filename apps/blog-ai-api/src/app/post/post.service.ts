import {
  absent,
  Category,
  Post,
  present,
} from '@challenge-vue-api-blog-ai/shared';
import { JsonFileStorageService } from '@challenge-vue-api-blog-ai/shared-nest';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private readonly storage: JsonFileStorageService) {}

  retrieveOne(uuid: string): Post {
    const post = this.storage.retrieveOneBy<Post>('post', { uuid });
    if (absent(post)) {
      throw new NotFoundException();
    }

    return post;
  }

  retrieve(): Post[] {
    return this.storage.retrieveBy<Post>('post', {});
  }

  create(postCandidate: Partial<Post>): Post {
    let category: Category | undefined = undefined;

    if (present(postCandidate.categoryUuid)) {
      category = this.storage.retrieveOneBy<Category>('category', {
        uuid: postCandidate.categoryUuid,
      });
    }

    return this.storage.upsertOne<Post>('post', {
      ...postCandidate,
      category,
    } as Post);
  }

  update(uuid: string, postCandidate: Partial<Post>): Post {
    const post = this.retrieveOne(uuid);
    let category: Category | undefined = undefined;

    if (present(postCandidate.categoryUuid)) {
      category = this.storage.retrieveOneBy<Category>('category', {
        uuid: postCandidate.categoryUuid,
      });
    }
    return this.storage.upsertOne<Post>('post', {
      ...postCandidate,
      category,
      uuid: post.uuid,
    } as Post);
  }
}