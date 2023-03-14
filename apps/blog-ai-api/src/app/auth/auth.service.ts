import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthService,
  JsonFileStorageService,
} from '@challenge-vue-api-blog-ai/shared-nest';
import {
  absent,
  fromUnknownToDate,
  present,
  User,
} from '@challenge-vue-api-blog-ai/shared';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly storage: JsonFileStorageService
  ) {}

  async validateUser(userCandidate: Partial<User>): Promise<User> {
    const user = this.storage.retrieveOneBy<User>('user', {
      username: userCandidate.username,
    });
    if (absent(user)) {
      throw new NotFoundException();
    }
    if (await bcrypt.compare(userCandidate.password, user.password)) {
      return user;
    }
    throw new UnauthorizedException();
  }

  login(res: any, user: User) {
    return this.handleJWT(res, user);
  }

  async register(res: any, userCandidate: Partial<User>) {
    let user = this.storage.retrieveOneBy<User>('user', {
      username: userCandidate.username,
    });

    if (present(user)) {
      throw new ConflictException();
    }
    user = this.storage.upsertOne<User>('user', {
      ...userCandidate,
      password: await bcrypt.hash(userCandidate.password, 10),
    } as User);

    return this.login(res, user);
  }

  private handleJWT(
    res: any,
    user: Partial<User & { exp: number; iat: number }>
  ): User {
    const { exp, iat, ...userToken } = user;
    const credentials = {
      user,
      accessToken: this.jwtService.sign({ ...userToken }),
    };
    this.setCookieJWT(res, credentials.accessToken);
    return user as User;
  }

  private setCookieJWT(res: any, accessToken: string) {
    const current_date = fromUnknownToDate('tomorrow');
    res.cookie('accessToken', accessToken, {
      expires: current_date,
      httpOnly: true,
    });
  }
}
