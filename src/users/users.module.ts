import { VerifyModule } from './../verify/verify.module';
import { UserService } from './users.service';
import { UsersResolvers } from './users.resolver';
import { UserRepo } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [VerifyModule, TypeOrmModule.forFeature([UserRepo])],
  providers: [UsersResolvers, UserService],
})
export class UsersModule {}
