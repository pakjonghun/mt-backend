import { CoreEntity } from './../../core/entities/core.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { IsEmail, IsString, Length } from 'class-validator';

import * as bcrypt from 'bcrypt';

@Entity()
@ObjectType()
export class Users extends CoreEntity {
  @IsEmail()
  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @IsString()
  @Column()
  @Length(5, 10, { message: 'gt 5, lt 10' })
  @Field(() => String)
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async checkPassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
