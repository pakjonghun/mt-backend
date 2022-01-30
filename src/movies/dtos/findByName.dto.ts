import { MovieEntity } from '../entities/movies.entity';
import { ArgsType, PickType, OmitType, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class FindByNameDto extends PickType(MovieEntity, ['name'], ArgsType) {}

@ObjectType()
export class OutFindByName extends OmitType(MovieEntity, [
  'createdAt',
  'updatedAt',
]) {}
