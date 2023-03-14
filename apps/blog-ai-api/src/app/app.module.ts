import {
  JsonFileStorageService,
  LoggerMiddleware,
} from '@challenge-vue-api-blog-ai/shared-nest';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  providers: [
    {
      provide: JsonFileStorageService,
      useFactory: (configService: ConfigService) => {
        return new JsonFileStorageService(
          configService.getOrThrow('JSON_FILE_PATH')
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [JsonFileStorageService],
})
export class GlobalModule {}

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
