import {
  AuthService,
  JwtStrategy,
  LocalStrategy,
} from '@challenge-vue-api-blog-ai/shared-nest';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceImpl } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: config.getOrThrow('JWT_EXPIRATION') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    {
      provide: LocalStrategy,
      useFactory(authService: AuthService) {
        return new LocalStrategy(authService);
      },
      inject: [AuthService],
    },
    { provide: AuthService, useClass: AuthServiceImpl },
  ],
})
export class AuthModule {}
