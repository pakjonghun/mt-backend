import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class Auth implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    console.log('auth', ctx['user']);
    return !!ctx['user'];
  }
}

@Injectable()
export class IsMe implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const temp = GqlExecutionContext.create(context);
    const ctx = temp.getContext();
    const args = temp.getArgs();
    console.log('isMe', ctx['user']['id'], args.id);
    return ctx['user'].id === args['id'];
  }
}
