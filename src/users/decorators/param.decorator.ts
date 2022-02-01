import { Users } from './../entities/users.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getManager } from 'typeorm';

export const FindByEmail = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const args = GqlExecutionContext.create(ctx).getArgs();
    const user = getManager().getRepository(Users);
    return user.findOne({ email: args['email'] });
  },
);
