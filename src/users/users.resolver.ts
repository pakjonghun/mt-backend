import { Users } from './entities/users.entity';
import { NotFoundException } from '@nestjs/common';
import { OutRegisterUser, RegisterUserDto } from './dtos/register.dto';
import { UserService } from './users.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OutLogin, LoginDto } from './dtos/login.dto';
import { FindByEmail } from './decorators/param.decorator';

@Resolver()
export class UsersResolvers {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => OutRegisterUser)
  register(@Args() args: RegisterUserDto): Promise<OutRegisterUser> {
    return this.userService.register(args);
  }

  @Mutation(() => OutLogin)
  login(
    @Args() args: LoginDto,
    @FindByEmail() user: Users | null,
  ): Promise<OutLogin> {
    if (!user) throw new NotFoundException();
    return this.userService.login(user, args.password);
  }
}
