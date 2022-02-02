import { OPTIONS } from './../jwt/jwt.constants';
import { MailService } from './mail.service';
import { MailOptions } from './mail.interface';
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class MailModule {
  static forRoot(options: MailOptions): DynamicModule {
    return {
      module: MailModule,
      exports: [MailService],
      providers: [
        MailService,
        {
          provide: OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
