import { VerifyRepo } from './repositories/verify.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyService {
  constructor(private readonly verifyRepo: VerifyRepo) {}

  private async deleteByUserId(id: number): Promise<void> {
    this.verifyRepo.delete({ user: { id } });
  }

  async createByUserId(id: number) {
    await this.deleteByUserId(id);
    return this.verifyRepo.save(this.verifyRepo.create({ user: { id } }));
  }
}
