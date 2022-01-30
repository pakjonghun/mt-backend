import { MovieRepo } from './repositories/movie.repository';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MoviesResolver } from './movies.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepo])],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
