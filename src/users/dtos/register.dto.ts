import { OutMutation } from './../../core/dto/mutation.dto';
import {
  ArgsType,
  ObjectType,
  PickType,
  OmitType,
  Field,
} from '@nestjs/graphql';
import { Users } from '../entities/users.entity';
import { IsString, Length, IsEmail } from 'class-validator';
import {
  IsEmailExist,
  IsPasswordSame,
} from '../decorators/validator.decorator';
import { Column } from 'typeorm';

@ArgsType()
export class RegisterUserDto extends PickType(Users, ['password'], ArgsType) {
  @IsString()
  @Length(5, 10, { message: 'gt 5,lt 10' })
  @IsPasswordSame('password', { message: 'different password' })
  @Field(() => String)
  passwordConfirm: string;

  @IsEmail()
  @IsEmailExist({ message: 'Exist Email' })
  @Column({ unique: true })
  @Field(() => String)
  email: string;
}

@ObjectType()
class User extends OmitType(Users, ['createdAt', 'updatedAt', 'password']) {}

@ObjectType()
export class OutRegisterUser extends OutMutation {
  @Field(() => User)
  user: User;
}
