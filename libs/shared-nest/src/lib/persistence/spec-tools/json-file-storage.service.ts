import {
  absent,
  Model,
  Pagination,
  present,
} from '@challenge-vue-api-blog-ai/shared';
import { JsonFileStorageService } from '../json-file-storage.service';

export class StubJsonFileStorageService extends JsonFileStorageService {
  // TODO type
  private constructor(
    readonly one: any | undefined,
    readonly many: Pagination<any> | undefined,
    readonly all: any[] | undefined,
    readonly created: any | undefined,
    readonly updated: any | undefined,
    readonly deleted: boolean | undefined,
    readonly error: Error | undefined
  ) {
    super();
  }

  static fromValues(values: Partial<StubJsonFileStorageService>) {
    return new StubJsonFileStorageService(
      values.one,
      values.many,
      values.all,
      values.created,
      values.updated,
      values.deleted,
      values.error
    );
  }

  retrieveOneBy<T extends Model>(_: string, __: Partial<T>): T | undefined {
    if (present(this.error)) {
      throw this.error;
    }

    return this.one;
  }
  retrieveBy<T>(_: string, __: Partial<T>, ___: number): Pagination<T> {
    if (present(this.error)) {
      throw this.error;
    }

    if (absent(this.many)) {
      throw new Error('Unexpected undefined many');
    }

    return this.many;
  }

  retrieveAllBy<T extends Model>(_: string, __: Partial<T>): T[] {
    if (present(this.error)) {
      throw this.error;
    }

    if (absent(this.all)) {
      throw new Error('Unexpected undefined all');
    }

    return this.all;
  }

  upsertOne<T>(_: string, __: T): T {
    if (present(this.error)) {
      throw this.error;
    }

    if (absent(this.updated) && absent(this.created)) {
      throw new Error('Unexpected undefined updated and created');
    }

    return this.created ?? this.updated;
  }
  deleteByUuid<T>(
    _: string,
    __: string
  ): { models: Pagination<T>; deleted: boolean } {
    if (present(this.error)) {
      throw this.error;
    }

    if (absent(this.many)) {
      throw new Error('Unexpected undefined many');
    }

    if (absent(this.deleted)) {
      throw new Error('Unexpected undefined deleted');
    }

    return { models: this.many, deleted: this.deleted };
  }
}
