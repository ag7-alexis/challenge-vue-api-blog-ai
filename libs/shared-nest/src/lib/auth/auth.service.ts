import { User } from '@challenge-vue-api-blog-ai/shared';

export abstract class AuthService {
  abstract validateUser(l: Partial<User>): Promise<User | null>;
}
