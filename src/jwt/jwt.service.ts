import { OPTIONS } from './jwt.constants';
import { JwtOptions } from './jwt.interface';
import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(@Inject(OPTIONS) private readonly options: JwtOptions) {}

  sign(payload: string | any) {
    return jwt.sign(payload, this.options.SECRET);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.SECRET);
  }
}
