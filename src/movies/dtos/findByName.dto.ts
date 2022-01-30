import { Movies } from '../entities/movies.entity';
import { ArgsType, PickType, OmitType, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class FindByNameDto extends PickType(Movies, ['name'], ArgsType) {}

@ObjectType()
export class OutFindByName extends OmitType(Movies, [
  'createdAt',
  'updatedAt',
]) {}
