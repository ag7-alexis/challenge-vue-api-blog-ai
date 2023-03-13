import { Model } from '@challenge-vue-api-blog-ai/shared';
import { Injectable } from '@nestjs/common';
import * as jsonfile from 'jsonfile';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JsonFileStorageService {
  private readonly options = { spaces: 2 };
  constructor(private readonly filePath: string) {}

  retrieveOneBy<T extends Model>(type: string, filter: Partial<T>): T {
    const json = jsonfile.readFileSync(this.filePath);
    const models: T[] = json[type];
    if (Object.keys(filter).length === 0) {
      return models[0];
    }
    return models.find((m) =>
      Object.entries(filter).every(([key, value]) => m[key] === value)
    );
  }

  retrieveBy<T extends Model>(type: string, filter: Partial<T>): T[] {
    const json = jsonfile.readFileSync(this.filePath);
    const models: T[] = json[type];
    if (Object.keys(filter).length === 0) {
      return models;
    }
    return models.filter((m) =>
      Object.entries(filter).every(([key, value]) => m[key] === value)
    );
  }

  upsertOne<T extends Model>(type: string, modelCandidate: T) {
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
}
