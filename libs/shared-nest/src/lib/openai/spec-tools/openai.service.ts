import { absent, present } from '@challenge-vue-api-blog-ai/shared';
import { OpenAiService } from '../openai.service';

export class StubOpenAiService extends OpenAiService {
  private constructor(
    readonly generatedText: string | undefined,
    readonly error: Error | undefined
  ) {
    super();
  }

  static fromValues(values: Partial<StubOpenAiService>) {
    return new StubOpenAiService(values.generatedText, values.error);
  }

  async generateText(_: string): Promise<string> {
    if (present(this.error)) {
      throw this.error;
    }
    console.log(this);
    if (absent(this.generatedText)) {
      throw new Error('Unexpected missing generatedText');
    }
    console.log('eeeeeeee');
    return this.generatedText;
  }
}
