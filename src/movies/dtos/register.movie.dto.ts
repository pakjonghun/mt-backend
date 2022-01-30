import { Movies } from './../entities/movies.entity';
import { ArgsType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';

@ArgsType()
export class RegisterMovieDto extends OmitType(
  PartialType(Movies),
  ['id', 'createdAt', 'updatedAt'],
  ArgsType,
) {}

@ObjectType()
export class OutRegisterMovie extends OmitType(Movies, [
  'createdAt',
  'updatedAt',
]) {}
