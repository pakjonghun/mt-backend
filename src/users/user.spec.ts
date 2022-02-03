import { VerifyService } from './../verify/verify.service';
import { MailService } from './../mail/mail.service';
import { UserRepo } from './repositories/user.repository';
import { JwtService } from './../jwt/jwt.service';
import { UserService } from './users.service';
import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
const user = {
  checkPassword: jest.fn(),
  hashPassword: jest.fn(),
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 1,
  email: '',
  password: '',
  IsValided: false,
};
const mockJwt = () => ({
  sign: jest.fn(),
  verify: jest.fn(),
});

const mockUserRepo = () => ({
  save: jest.fn(),
  create: jest.fn(),
});

const mockMail = () => ({
  formMaker: jest.fn(),
  send: jest.fn(),
});

const mockVerify = () => ({
  deleteByUserId: jest.fn(),
  createByUserId: jest.fn(),
  findByCode: jest.fn(),
  deleteById: jest.fn(),
});

describe('user', () => {
  let service: UserService;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;
  let verifyService: Partial<Record<keyof VerifyService, jest.Mock>>;
  let mailService: MailService;
  let userRepo: Partial<Record<keyof UserRepo, jest.Mock>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: JwtService, useValue: mockJwt() },
        {
          provide: UserRepo,
          useValue: mockUserRepo(),
        },
        {
          provide: MailService,
          useValue: mockMail(),
        },
        {
          provide: VerifyService,
          useValue: mockVerify(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jwtService = module.get(JwtService);
    verifyService = module.get(VerifyService);
    mailService = module.get<MailService>(MailService);
    userRepo = module.get(UserRepo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const args = { email: '', password: '', passwordConfirm: '' };
    it('should throw error', async () => {
      userRepo.save.mockRejectedValue(new Error(''));
      try {
        await service.register(args);
      } catch (err) {
        expect(err).toStrictEqual(new Error(''));
      }
    });

    it('should be called', async () => {
      userRepo.create.mockReturnValue(args);
      userRepo.save.mockResolvedValue({ id: 1, ...args });
      jest
        .spyOn(verifyService, 'createByUserId')
        .mockImplementation(async () => ({ code: '1' }));

      const r = await service.register(args);
      expect(userRepo.create).toHaveBeenCalledTimes(1);
      expect(userRepo.create).toHaveBeenCalledWith(args);
      expect(r).toStrictEqual({ isSuccess: true, user: { email: '', id: 1 } });
    });
  });

  describe('login', () => {
    it('should throw exception', async () => {
      try {
        user.checkPassword.mockResolvedValue(false);
        await service.login(user, '1');
      } catch (err) {
        expect(err).toStrictEqual(new UnauthorizedException());
      }
    });

    it('should called', async () => {
      user.checkPassword.mockResolvedValue(true);
      jwtService.sign.mockReturnValue('token');

      const r = await service.login(user, '1');
      expect(jwtService.sign).toBeCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: 1 });
      expect(r).toStrictEqual({ isSuccess: true, token: 'token' });
    });
  });

  describe('update', () => {
    it('should throw exception', async () => {
      try {
        await service.update(user, { id: 1, user: {} });
      } catch (err) {
        expect(err).toStrictEqual(new BadRequestException());
      }
    });

    it('should called', async () => {
      verifyService.createByUserId.mockResolvedValue({ code: 'code' });
      userRepo.save.mockResolvedValue({ id: 1 });

      const r = await service.update(user, {
        id: 1,
        user: { email: '1', password: '1' },
      });
      expect(verifyService.createByUserId).toBeCalled();
      expect(mailService.send).toBeCalledWith({
        user: '1',
        href: 'https://naver.com',
        test: 'code',
      });
      expect(r).toStrictEqual({ isSuccess: true, user: { id: 1 } });
    });
  });

  describe('verify', () => {
    const code = 'code';
    it('should throw not found exception', async () => {
      try {
        await verifyService.findByCode.mockResolvedValue(null);
      } catch (err) {
        expect(err).toStrictEqual(new NotFoundException());
      }
    });

    it('should be called with', async () => {
      const args = { code, id: 1, user: { id: 1 } };
      verifyService.findByCode.mockResolvedValue(args);
      await service.verify(code);
      expect(verifyService.deleteById).toBeCalledTimes(1);
      expect(verifyService.deleteById).toBeCalledWith(1);
      expect(userRepo.save).toBeCalledTimes(1);
      expect(userRepo.save).toBeCalledWith({ id: 1, IsValided: true });
    });
  });
});
