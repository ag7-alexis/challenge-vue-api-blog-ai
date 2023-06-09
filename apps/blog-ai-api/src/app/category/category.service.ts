import {
  absent,
  Category,
  Pagination,
  Post,
  present,
} from '@challenge-vue-api-blog-ai/shared';
import { JsonFileStorageService } from '@challenge-vue-api-blog-ai/shared-nest';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(private readonly storage: JsonFileStorageService) {}

  retrieveOne(uuid: string): Category {
    const category = this.storage.retrieveOneBy<Category>('category', { uuid });
    if (absent(category)) {
      throw new NotFoundException();
    }
    return category;
  }

  retrieve(page: number = 0): Pagination<Category> {
    return this.storage.retrieveBy<Category>('category', {}, page);
  }

  create(categoryCandidate: Partial<Category>) {
    const slug = this.generateSlug(categoryCandidate.name);
    const category = this.storage.retrieveOneBy<Category>('category', { slug });
    if (present(category)) {
      throw new ConflictException();
    }

    return this.storage.upsertOne<Category>('category', {
      ...categoryCandidate,
      slug,
    } as Category);
  }

  update(uuid: string, categoryCandidate: Partial<Category>) {
    const category = this.retrieveOne(uuid);

    const slug = this.generateSlug(categoryCandidate.name);
    const categoryConflict = this.storage.retrieveOneBy<Category>('category', {
      slug,
    });
    if (present(categoryConflict) && categoryConflict.uuid !== category.uuid) {
      throw new ConflictException();
    }

    return this.storage.upsertOne<Category>('category', {
      ...categoryCandidate,
      slug,
      uuid: category.uuid,
    } as Category);
  }

  private generateSlug(name: string) {
    return slugify(name, {
      lower: true,
      trim: true,
      replacement: '-',
    });
  }

  delete(uuid: string): Pagination<Category> {
    const { models, deleted } = this.storage.deleteByUuid<Category>(
      'category',
      uuid
    );
    if (false === deleted) {
      throw new NotFoundException();
    }
    const posts = this.storage.retrieveAllBy<Post>('post', {
      categoryUuid: uuid,
    });
    for (const post of posts) {
      this.storage.upsertOne(post.uuid, {
        ...post,
        category: undefined,
        categoryUuid: undefined,
        status: 'draft',
      });
    }
    return models;
  }
}
