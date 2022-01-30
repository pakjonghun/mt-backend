import { FindByNameDto } from './dtos/findByName.dto';
import { OutFindByName } from './dtos/findByName.dto';
import { OutRegisterMovie, RegisterMovieDto } from './dtos/register.movie.dto';
import { MoviesService } from './movies.service';
import { OutFindAll } from './dtos/findAll.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}
  @Query(() => [OutFindAll])
  findAll(): Promise<OutFindAll[]> {
    return this.moviesService.findAll();
  }

  @Query(() => [OutFindByName])
  findByName(@Args() name: FindByNameDto): Promise<OutFindByName[]> {
    return this.moviesService.findByName(name);
  }

  @Mutation(() => OutRegisterMovie)
  registerMovie(@Args() args: RegisterMovieDto): Promise<OutRegisterMovie> {
    return this.moviesService.registerMovie(args);
  }
}
