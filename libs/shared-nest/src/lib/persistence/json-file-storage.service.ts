import { Model, Pagination } from '@challenge-vue-api-blog-ai/shared';
import { Injectable } from '@nestjs/common';
import * as jsonfile from 'jsonfile';
import { v4 as uuidv4 } from 'uuid';

export abstract class JsonFileStorageService {
  abstract retrieveOneBy<T extends Model>(
    type: string,
    filter: Partial<T>
  ): T | undefined;
  abstract retrieveBy<T extends Model>(
    type: string,
    filter: Partial<T>,
    page: number
  ): Pagination<T>;
  abstract retrieveAllBy<T extends Model>(
    type: string,
    filter: Partial<T>
  ): T[];
  abstract upsertOne<T extends Model>(type: string, modelCandidate: T): T;
  abstract deleteByUuid<T extends Model>(
    type: string,
    uuid: string
  ): { models: Pagination<T>; deleted: boolean };
}

@Injectable()
export class JsonFileStorageServiceImpl extends JsonFileStorageService {
  private readonly options = { spaces: 2 };
  private readonly itemPerPage = 10;
  constructor(private readonly filePath: string) {
    super();
  }

  retrieveOneBy<T extends Model>(
    type: string,
    filter: Partial<T>
  ): T | undefined {
    const json = jsonfile.readFileSync(this.filePath);
    const models: T[] = json[type];
    if (Object.keys(filter).length === 0) {
      return models[0];
    }
    return models.find((m) =>
      Object.entries(filter).every(([key, value]) => m[key] === value)
    );
  }

  retrieveBy<T extends Model>(
    type: string,
    filter: Partial<T>,
    page: number = 0
  ): Pagination<T> {
    const json = jsonfile.readFileSync(this.filePath);
    const models: T[] = json[type];
    if (Object.keys(filter).length === 0) {
      return this.paginate(models, page);
    }

    const filteredModels = models.filter((m) =>
      Object.entries(filter).every(([key, value]) => m[key] === value)
    );

    return this.paginate(filteredModels, page);
  }

  retrieveAllBy<T extends Model>(type: string, filter: Partial<T>): T[] {
    const json = jsonfile.readFileSync(this.filePath);
    const models: T[] = json[type];
    if (Object.keys(filter).length === 0) {
      return models;
    }

    const filteredModels = models.filter((m) =>
      Object.entries(filter).every(([key, value]) => m[key] === value)
    );

    return filteredModels;
  }

  upsertOne<T extends Model>(type: string, modelCandidate: T): T {
    const json = jsonfile.readFileSync(this.filePath);
    const models: T[] = json[type];

    const modelIndex = models.findIndex((m) => m.uuid === modelCandidate.uuid);
    if (modelIndex !== -1) {
      const model = models[modelIndex];
      modelCandidate = { ...model, ...modelCandidate };
      models.splice(modelIndex, 1);
    } else {
      modelCandidate = { uuid: uuidv4(), ...modelCandidate };
    }

    jsonfile.writeFileSync(
      this.filePath,
      {
        ...json,
        [type]: [...models, modelCandidate],
      },
      this.options
    );

    return modelCandidate;
  }

  deleteByUuid<T extends Model>(
    type: string,
    uuid: string
  ): { models: Pagination<T>; deleted: boolean } {
    const json = jsonfile.readFileSync(this.filePath);
    const models: T[] = json[type];
    const filterdModels = models.filter((m) => m.uuid !== uuid);
    jsonfile.writeFileSync(
      this.filePath,
      {
        ...json,
        [type]: filterdModels,
      },
      this.options
    );

    return {
      models: this.paginate(filterdModels, 0),
      deleted: filterdModels.length < models.length,
    };
  }

  private paginate<T>(models: T[], page: number) {
    const data = models.splice(page * this.itemPerPage, this.itemPerPage);
    return Pagination.fromValues({
      data,
      count: data.length,
      pageCount: Math.ceil(models.length / this.itemPerPage),
      page,
      total: models.length,
    });
  }
}
