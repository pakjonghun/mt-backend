import { JwtService } from './../jwt/jwt.service';
import { Users } from './entities/users.entity';
import { OutLogin } from './dtos/login.dto';
import { OutRegisterUser, RegisterUserDto } from './dtos/register.dto';
import { UserRepo } from './repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepo,
  ) {}

  async register(args: RegisterUserDto): Promise<OutRegisterUser> {
    const user = await this.userRepo.save(this.userRepo.create(args));
    return { isSuccess: true, user };
  }

  async login(user: Users, password: string): Promise<OutLogin> {
    const isPassswordCorrect = await user.checkPassword(password);
    if (!isPassswordCorrect) throw new NotFoundException();
    const token = this.jwtService.sign({ id: user.id });
    return { isSuccess: true, token };
  }
}
