import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

export abstract class OpenAiService {
  abstract generateText(t: string): Promise<string>;
}

@Injectable()
export class OpenAiServiceImpl extends OpenAiService {
  private readonly openai: OpenAIApi;
  async generateText(title: string): Promise<string> {
    const completion = await this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: this.generatePrompt(title),
      temperature: 0.6,
      max_tokens: 2049,
    });

    return completion.data.choices[0].text;
  }

  constructor(apiKey: string) {
    super();
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  private generatePrompt(x: string): string {
    return 'Génère moi un article sur : ' + x;
  }
}
