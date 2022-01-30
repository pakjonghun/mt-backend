import { Movies } from '../entities/movies.entity';
import { ObjectType, PartialType } from '@nestjs/graphql';

@ObjectType()
export class OutFindAll extends PartialType(Movies) {}
