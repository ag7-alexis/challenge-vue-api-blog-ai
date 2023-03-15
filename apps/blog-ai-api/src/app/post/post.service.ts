import {
  absent,
  Category,
  Pagination,
  Post,
  present,
} from '@challenge-vue-api-blog-ai/shared';
import {
  JsonFileStorageService,
  OpenAiService,
} from '@challenge-vue-api-blog-ai/shared-nest';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(
    private readonly storage: JsonFileStorageService,
    private readonly openAi: OpenAiService
  ) {}

  retrieveOne(uuid: string): Post {
    const post = this.storage.retrieveOneBy<Post>('post', { uuid });
    if (absent(post)) {
      throw new NotFoundException();
    }

    return post;
  }

  retrieve(page: number = 0): Pagination<Post> {
    return this.storage.retrieveBy<Post>('post', {}, page);
  }

  retrieveInsideCategory(uuid: string): Pagination<Post> {
    return this.storage.retrieveBy<Post>('post', { categoryUuid: uuid });
  }

  async create(postCandidate: Partial<Post>): Promise<Post> {
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

  delete(uuid: string): Pagination<Post> {
    const { models, deleted } = this.storage.deleteByUuid<Post>('post', uuid);
    if (false === deleted) {
      throw new NotFoundException();
    }

    return models;
  }

  generateText(title: string) {
    return this.openAi.generateText(title);
  }
}
