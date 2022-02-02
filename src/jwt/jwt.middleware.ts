import { UserRepo } from './../users/repositories/user.repository';
import { JwtService } from './jwt.service';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: any, _: any, next: () => void) {
    try {
      const token = req.headers['authorization'];
      if (!token) next();
      const payload = this.jwtService.verify(token);
      if (!(typeof payload === 'object') || !('id' in payload)) next();
      const user = await this.userRepo.findOne({ id: payload['id'] });
      req['user'] = user;
    } catch (err) {
    } finally {
      next();
    }
  }
}
