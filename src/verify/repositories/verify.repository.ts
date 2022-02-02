import { Verify } from './../entities/verify.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Verify)
export class VerifyRepo extends Repository<Verify> {}
