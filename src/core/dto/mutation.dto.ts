import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class OutMutation {
  @IsBoolean()
  @Field(() => Boolean)
  isSuccess: boolean;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  error?: string;
}
