import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@ArgsType()
export class PagnationDto {
  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  offset?: number;
}

@ObjectType()
export class OutPagnation {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  totalResults?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  totalPages?: number;
}
