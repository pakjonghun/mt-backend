import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class OutMutation {
  @IsBoolean()
  @Field(() => Boolean)
  isSuccess: boolean;

  @IsString()
  @IsOptional()
  @Field(() => String, { defaultValue: null })
  error?: string;
}
