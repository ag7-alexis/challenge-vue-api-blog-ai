import { User } from '@challenge-vue-api-blog-ai/shared';
import {
  AllowUnauthorizedRequest,
  AuthService,
  CurrentUser,
  JwtAuthGuard,
  LocalAuthGuard,
} from '@challenge-vue-api-blog-ai/shared-nest';
import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() userCandidate: User,
    @Response({ passthrough: true }) res
  ) {
    return this.service.login(res, userCandidate);
  }

  @Post('register')
  @AllowUnauthorizedRequest()
  register(
    @Body() userData: Partial<User>,
    @Response({ passthrough: true }) res
  ) {
    return this.service.register(res, userData);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  check(
    @CurrentUser() userCandidate: User,
    @Response({ passthrough: true }) res
  ) {
    return this.service.login(res, userCandidate);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Response({ passthrough: true }) res) {
    res.clearCookie('accessToken', {
      sameSite: 'strict',
      httpOnly: true,
    });
    return true;
  }
}
