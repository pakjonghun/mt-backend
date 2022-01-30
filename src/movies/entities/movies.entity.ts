import { CoreEntity } from './../../core/entities/core.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
@ObjectType()
export class Movies extends CoreEntity {
  @Column()
  @IsString({ message: 'movie name must be string' })
  @Field(() => String)
  name: string;
}
