import {
  Pagination,
  Post,
  randomString,
  randomUuid,
} from '@challenge-vue-api-blog-ai/shared';
import {
  StubJsonFileStorageService,
  StubOpenAiService,
} from '@challenge-vue-api-blog-ai/shared-nest';
import { NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';

describe('PostService', () => {
  describe('retrieveOne', () => {
    it('should return a post', () => {
      const uuid = randomUuid();
      const expected: Partial<Post> = {
        uuid,
        title: randomString(),
      };
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ one: expected }),
        StubOpenAiService.fromValues({})
      );

      const actual = service.retrieveOne(uuid);

      expect(actual).toEqual(expected);
    });

    it('should throw not found exception', () => {
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ one: undefined }),
        StubOpenAiService.fromValues({})
      );

      expect(() => service.retrieveOne(undefined)).toThrow(NotFoundException);
    });

    it('should throw an error', () => {
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ error: new Error('error') }),
        StubOpenAiService.fromValues({})
      );

      expect(() => service.retrieveOne(randomUuid())).toThrow('error');
    });
  });
  describe('retrieve', () => {
    it('should return pagination post', () => {
      const expected: Pagination<Partial<Post>> = Pagination.fromValues({
        data: [
          {
            uuid: randomUuid(),
            title: randomString(),
          },
        ],
      });
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ many: expected }),
        StubOpenAiService.fromValues({})
      );

      const actual = service.retrieve();

      expect(actual).toEqual(expected);
    });

    it('should throw an error', () => {
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ error: new Error('error') }),
        StubOpenAiService.fromValues({})
      );

      expect(() => service.retrieve()).toThrow('error');
    });
  });

  describe('retrieveInsideCategory', () => {
    it('should return pagination post', () => {
      const expected: Pagination<Partial<Post>> = Pagination.fromValues({
        data: [
          {
            uuid: randomUuid(),
            title: randomString(),
          },
        ],
      });
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ many: expected }),
        StubOpenAiService.fromValues({})
      );

      const actual = service.retrieveInsideCategory(randomUuid());

      expect(actual).toEqual(expected);
    });

    it('should throw an error', () => {
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ error: new Error('error') }),
        StubOpenAiService.fromValues({})
      );

      expect(() => service.retrieveInsideCategory(randomUuid())).toThrow(
        'error'
      );
    });
  });

  describe('create', () => {
    it('should return a new post', async () => {
      const expected: Partial<Post> = {
        title: randomString(),
      };
      const service = new PostService(
        StubJsonFileStorageService.fromValues({
          one: undefined,
          created: expected,
        }),
        StubOpenAiService.fromValues({})
      );

      const actual = await service.create(expected);

      expect(actual).toEqual(expected);
    });

    it('should throw an error', () => {
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ error: new Error('error') }),
        StubOpenAiService.fromValues({})
      );

      expect(async () => await service.create({})).rejects.toThrow('error');
    });
  });

  describe('update', () => {
    it('should return a updated post', () => {
      const uuid = randomUuid();
      const expected: Partial<Post> = {
        uuid,
        title: randomString(),
      };
      const service = new PostService(
        StubJsonFileStorageService.fromValues({
          one: expected,
          updated: expected,
        }),
        StubOpenAiService.fromValues({})
      );

      const actual = service.update(uuid, expected);

      expect(actual).toEqual(expected);
    });

    it('should throw not found exception', () => {
      const service = new PostService(
        StubJsonFileStorageService.fromValues({ one: undefined }),
        StubOpenAiService.fromValues({})
      );

      expect(() => service.update(randomUuid(), {})).toThrow(NotFoundException);
    });

    it('should throw an error', () => {
      const service = new PostService(
        StubJsonFileStorageService.fromValues({
          one: { uuid: randomUuid() },
          error: new Error('error'),
        }),
        StubOpenAiService.fromValues({})
      );

      expect(() => service.update(randomUuid(), {})).toThrow('error');
    });
  });

  describe('generateText', () => {
    it('should return string', async () => {
      const expected = randomString();
      const service = new PostService(
        StubJsonFileStorageService.fromValues({}),
        StubOpenAiService.fromValues({ generatedText: expected })
      );

      const actual = await service.generateText(randomString());

      expect(actual).toEqual(expected);
    });

    it('should throw an error', () => {
      const service = new PostService(
        StubJsonFileStorageService.fromValues({}),
        StubOpenAiService.fromValues({ error: new Error('error') })
      );

      expect(
        async () => await service.generateText(randomString())
      ).rejects.toThrow('error');
    });
  });
});
