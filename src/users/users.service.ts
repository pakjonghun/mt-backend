import { VerifyService } from './../verify/verify.service';
import { MailService } from './../mail/mail.service';
import { UpdateDto, OutUpdate } from './dtos/update.dto';
import { JwtService } from './../jwt/jwt.service';
import { Users } from './entities/users.entity';
import { OutLogin } from './dtos/login.dto';
import { OutRegisterUser, RegisterUserDto } from './dtos/register.dto';
import { UserRepo } from './repositories/user.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepo,
    private readonly mailService: MailService,
    private readonly verifyService: VerifyService,
  ) {}

  async register(args: RegisterUserDto): Promise<OutRegisterUser> {
    const { email, id } = await this.userRepo.save(this.userRepo.create(args));
    const { code: test } = await this.verifyService.createByUserId(id);
    await this.mailService.send({
      user: id + '',
      href: 'https://naver.com',
      test,
    });
    return { isSuccess: true, user: { email, id } };
  }

  async login(user: Users, password: string): Promise<OutLogin> {
    const isPassswordCorrect = await user.checkPassword(password);
    if (!isPassswordCorrect) throw new NotFoundException();
    const token = this.jwtService.sign({ id: user.id });
    return { isSuccess: true, token };
  }

  async update(U: Users, { id, user: u }: UpdateDto): Promise<OutUpdate> {
    switch (true) {
      case !!u.email:
        U.email = u.email;
        const { code: test } = await this.verifyService.createByUserId(id);
        await this.mailService.send({
          user: id + '',
          href: 'https://naver.com',
          test,
        });
        break;
      case !!u.password:
        U.password = u.password;
        break;
      default:
        throw new BadRequestException();
    }
    const user = await this.userRepo.save(this.userRepo.create({ id, ...u }));
    return { isSuccess: true, user };
  }

  async verify(code: string) {
    const isExist = await this.verifyService.findByCode(code);
    if (!isExist) throw new NotFoundException();
    await this.verifyService.deleteById(isExist.id);
    isExist.user.IsValided = true;
    await this.userRepo.save(isExist.user);
  }
}
