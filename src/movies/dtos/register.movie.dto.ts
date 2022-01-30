import { MovieEntity } from './../entities/movies.entity';
import { ArgsType, ObjectType, OmitType, PartialType } from '@nestjs/graphql';

@ArgsType()
export class RegisterMovieDto extends OmitType(
  PartialType(MovieEntity),
  ['id', 'createdAt', 'updatedAt'],
  ArgsType,
) {}

@ObjectType()
export class OutRegisterMovie extends OmitType(MovieEntity, [
  'createdAt',
  'updatedAt',
]) {}
