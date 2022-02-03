import { MovieRepo } from './repositories/movie.repository';
import { FindByNameDto } from './dtos/findByName.dto';
import { OutRegisterMovie, RegisterMovieDto } from './dtos/register.movie.dto';
import { OutFindAll } from './dtos/findAll.dto';
import { Injectable } from '@nestjs/common';
import { OutFindByName } from './dtos/findByName.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepo) {}

  async findAll(): Promise<OutFindAll[]> {
    const [result, total] = await this.movieRepository.findAndCount();
    return result;
  }

  findByName({ name }: FindByNameDto): Promise<OutFindByName[]> {
    return this.movieRepository.find({ name });
  }

  registerMovie(args: RegisterMovieDto): Promise<OutRegisterMovie> {
    return this.movieRepository.save(this.movieRepository.create(args));
  }
}
