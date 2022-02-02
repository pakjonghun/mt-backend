import { OutUpdate, UpdateDto } from './dtos/update.dto';
import { Users } from './entities/users.entity';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { OutRegisterUser, RegisterUserDto } from './dtos/register.dto';
import { UserService } from './users.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OutLogin, LoginDto } from './dtos/login.dto';
import { FindByEmail, User } from './decorators/param.decorator';
import { IsMe, Auth } from './user.guard';

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

  @Mutation(() => OutUpdate)
  @UseGuards(IsMe)
  @UseGuards(Auth)
  update(@User() user: Users, @Args() args: UpdateDto): Promise<OutUpdate> {
    return this.userService.update(user, args);
  }
}
