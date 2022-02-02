import { IsNumber, IsOptional } from 'class-validator';
import { OutMutation } from './../../core/dto/mutation.dto';
import { Users } from './../entities/users.entity';
import {
  PartialType,
  OmitType,
  ArgsType,
  ObjectType,
  Field,
  Int,
  InputType,
  PickType,
} from '@nestjs/graphql';

@InputType()
export class UserUpdate extends PartialType(
  OmitType(Users, ['id', 'createdAt', 'updatedAt']),
  InputType,
) {}

@ArgsType()
export class UpdateDto {
  @Field(() => UserUpdate)
  user: UserUpdate;

  @IsNumber()
  @Field(() => Int)
  id: number;
}

@ObjectType()
class UpdateUser extends PickType(Users, ['email', 'id']) {}

@ObjectType()
export class OutUpdate extends OutMutation {
  @IsOptional()
  @Field(() => UpdateUser, { nullable: true })
  user: UpdateUser;
}
