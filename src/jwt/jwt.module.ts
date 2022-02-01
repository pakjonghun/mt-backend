import { JwtOptions } from './jwt.interface';
import { JwtService } from './jwt.service';
import { OPTIONS } from './jwt.constants';
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class JwtModule {
  static forRoot(options: JwtOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
