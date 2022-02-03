import { VerifyRepo } from './repositories/verify.repository';
import { VerifyService } from './verify.service';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
const mockRepo = () => ({
  findOne: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('verify', () => {
  let service: VerifyService;
  let verifyRepo: Partial<Record<keyof Repository<VerifyRepo>, jest.Mock>>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        VerifyService,
        {
          provide: VerifyRepo,
          useValue: mockRepo(),
        },
      ],
    }).compile();

    service = module.get<VerifyService>(VerifyService);
    verifyRepo = module.get(VerifyRepo);
  });

  it('should service defined', () => {
    expect(service).toBeDefined();
  });

  describe('deletedByUserId', () => {
    it('find By Code', async () => {
      await service.findByCode('code');
      expect(verifyRepo.findOne).toBeCalledTimes(1);
      expect(verifyRepo.findOne).toBeCalledWith({ code: 'code' });
    });

    it('delete by user Id', async () => {
      await service.deleteByUserId(1);
      expect(verifyRepo.delete).toBeCalledTimes(1);
      expect(verifyRepo.delete).toBeCalledWith({ user: { id: 1 } });
    });

    it('createByUserId', async () => {
      verifyRepo.create.mockReturnValue({ id: 1 });
      await service.createByUserId(1);
      expect(verifyRepo.delete).toBeCalledTimes(1);
      expect(verifyRepo.delete).toBeCalledWith({ user: { id: 1 } });
      expect(verifyRepo.create).toBeCalledWith({ user: { id: 1 } });
      expect(verifyRepo.create).toBeCalledWith(expect.any(Object));
      expect(verifyRepo.create).toBeCalledWith(expect.any(Object));
    });

    it('delete By Id', async () => {
      await service.deleteById(1);
      expect(verifyRepo.delete).toBeCalledTimes(1);
      expect(verifyRepo.delete).toBeCalledWith(1);
    });
  });
});
