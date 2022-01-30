import { MoviesService } from './movies.service';
import { MovieEntity } from './entities/movies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MoviesResolver } from './movies.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
