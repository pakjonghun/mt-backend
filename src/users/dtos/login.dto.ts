import { IsEmail } from 'class-validator';
import { OutMutation } from './../../core/dto/mutation.dto';
import { Users } from './../entities/users.entity';
import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { IsEmailExist } from '../decorators/validator.decorator';

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
