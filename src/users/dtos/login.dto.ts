import { OutMutation } from './../../core/dto/mutation.dto';
import { Users } from './../entities/users.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';

@ArgsType()
export class LoginDto extends PickType(
  Users,
  ['password', 'email'],
  ArgsType,
) {}

@ObjectType()
export class OutLogin extends OutMutation {
  @Field(() => String, { nullable: true })
  token?: string;
}
