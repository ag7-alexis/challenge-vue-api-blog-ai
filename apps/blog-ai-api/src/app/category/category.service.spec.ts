import {
  Category,
  Pagination,
  randomInt,
  randomString,
  randomUuid,
} from '@challenge-vue-api-blog-ai/shared';
import { StubJsonFileStorageService } from '@challenge-vue-api-blog-ai/shared-nest';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  describe('retrieveOne', () => {
    it('should return a category', () => {
      const uuid = randomUuid();
      const expected: Category = {
        uuid,
        name: randomString(),
        slug: randomString(),
      };
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({ one: expected })
      );

      const actual = service.retrieveOne(uuid);

      expect(actual).toEqual(expected);
    });

    it('should throw not found exception', () => {
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({ one: undefined })
      );

      expect(() => service.retrieveOne(undefined)).toThrow(NotFoundException);
    });

    it('should throw an error', () => {
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({ error: new Error('error') })
      );

      expect(() => service.retrieveOne(randomUuid())).toThrow('error');
    });
  });

  describe('retrieve', () => {
    it('should return a pagination with categories', () => {
      const uuid = randomUuid();
      const expected: Pagination<Category> = Pagination.fromValues({
        count: 1,
        data: [
          {
            uuid,
            name: randomString(),
            slug: randomString(),
          },
        ],
        page: 0,
        pageCount: 0,
        total: 1,
      });
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({ many: expected })
      );

      const actual = service.retrieve(0);

      expect(actual).toEqual(expected);
    });

    it('should throw an error', () => {
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({ error: new Error('error') })
      );

      expect(() => service.retrieve(randomInt())).toThrow('error');
    });
  });

  describe('create', () => {
    it('should create a category', () => {
      const expected: Category = {
        uuid: randomUuid(),
        name: randomString(),
        slug: randomString(),
      };
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({
          one: undefined,
          created: expected,
        })
      );

      const actual = service.create(expected);

      expect(actual).toEqual(expected);
    });

    it('should throw conflict', () => {
      const expected: Category = {
        uuid: randomUuid(),
        name: randomString(),
        slug: randomString(),
      };
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({
          one: expected,
          created: expected,
        })
      );

      expect(() => service.create(expected)).toThrow(ConflictException);
    });

    it('should throw an error', () => {
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({
          one: undefined,
          error: new Error('error'),
        })
      );

      expect(() =>
        service.create({
          name: randomString(),
        })
      ).toThrow('error');
    });
  });

  describe('update', () => {
    it('should update a category', () => {
      const uuid = randomUuid();
      const expected: Category = {
        uuid,
        name: randomString(),
        slug: randomString(),
      };
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({
          one: expected,
          updated: expected,
        })
      );

      const actual = service.update(uuid, expected);

      expect(actual).toEqual(expected);
    });

    it('should throw not found exception', () => {
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({ one: undefined })
      );

      expect(() =>
        service.update(randomUuid(), {
          uuid: randomUuid(),
          name: randomString(),
          slug: randomString(),
        })
      ).toThrow(NotFoundException);
    });

    it('should throw an error', () => {
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({
          error: new Error('error'),
        })
      );

      expect(() => service.update(randomUuid(), {})).toThrow('error');
    });
  });

  describe('delete', () => {
    it('should return categories without deleted one', () => {
      const uuid = randomUuid();
      const expected: Pagination<Category> = Pagination.fromValues({
        data: [{ uuid, name: randomString(), slug: randomString() }],
        count: 1,
        page: 0,
        pageCount: 0,
        total: 1,
      });
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({
          many: expected,
          all: [],
          deleted: true,
        })
      );

      const actual = service.delete(uuid);

      expect(actual).toEqual(expected);
    });

    it('should throw not found execption', () => {
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({
          many: Pagination.empty(),
          deleted: false,
        })
      );

      expect(() => service.delete(randomUuid())).toThrow(NotFoundException);
    });

    it('should throw not found execption', () => {
      const service = new CategoryService(
        StubJsonFileStorageService.fromValues({
          error: new Error('error'),
        })
      );

      expect(() => service.delete(randomUuid())).toThrow('error');
    });
  });
});
