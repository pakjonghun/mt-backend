import { VerifyRepo } from './repositories/verify.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyService } from './verify.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([VerifyRepo])],
  exports: [VerifyService],
  providers: [VerifyService],
})
export class VerifyModule {}
