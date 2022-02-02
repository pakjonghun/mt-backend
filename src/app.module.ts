import { JwtMiddleware } from './jwt/jwt.middleware';
import { UserRepo } from './users/repositories/user.repository';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MoviesModule } from './movies/movies.module';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';
import { VerifyModule } from './verify/verify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV !== 'dev',
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSPORT: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        MAIL_KEY: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        MAIL_DOMAIN: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSPORT,
      database: process.env.DB_DATABASE,
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepo]),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    MailModule.forRoot({
      MAIL_DOMAIN: process.env.MAIL_DOMAIN,
      MAIL_KEY: process.env.MAIL_KEY,
      MAIL_FROM: process.env.MAIL_FROM,
    }),
    JwtModule.forRoot({ SECRET: process.env.JWT_SECRET }),
    MoviesModule,
    CoreModule,
    UsersModule,
    VerifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
