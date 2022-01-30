import { Movies } from './../entities/movies.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Movies)
export class MovieRepo extends Repository<Movies> {}
