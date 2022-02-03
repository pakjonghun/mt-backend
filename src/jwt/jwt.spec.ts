import { OPTIONS } from './../mail/mail.constants';
import { JwtService } from './jwt.service';
import { Test } from '@nestjs/testing';
import * as jsonwebtoken from 'jsonwebtoken';
const options = { SECRET: 'secret' };

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe('jwt', () => {
  let service: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: OPTIONS,
          useValue: options,
        },
      ],
    }).compile();

    service = module.get<JwtService>(JwtService);
  });

  it('should be definde', () => {
    expect(service).toBeDefined();
  });

  describe('sign', () => {
    it('should be called with secret', () => {
      service.sign('1');
      expect(jsonwebtoken.sign).toBeCalledTimes(1);
      expect(jsonwebtoken.sign).toHaveBeenCalledWith('1', options.SECRET);
    });

    it('should be called with secret', () => {
      service.verify('token');
      expect(jsonwebtoken.verify).toBeCalledTimes(1);
      expect(jsonwebtoken.verify).toHaveBeenCalledWith('token', options.SECRET);
    });
  });
});
