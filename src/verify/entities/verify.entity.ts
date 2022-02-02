import { Users } from './../../users/entities/users.entity';
import { IsString } from 'class-validator';
import { CoreEntity } from './../../core/entities/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Field } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Verify extends CoreEntity {
  @IsString()
  @Column()
  @Field(() => String)
  code: string;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;

  @BeforeInsert()
  @BeforeUpdate()
  createCode() {
    this.code = uuidv4();
  }
}
