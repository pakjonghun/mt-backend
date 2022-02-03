import { OPTIONS } from './mail.constants';
import { MailService } from './mail.service';
import { Test } from '@nestjs/testing';
import got from 'got';
import * as formData from 'form-data';
import { createSecretKey } from 'crypto';

const mailOptions = {
  MAIL_KEY: 'key',
  MAIL_DOMAIN: 'domain',
  MAIL_FROM: 'from',
};

const templateOptions = {
  user: 'user',
  href: 'href',
  test: 'test',
};

jest.mock('got');
jest.mock('form-data');

describe('mail', () => {
  let service: MailService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: OPTIONS,
          useValue: mailOptions,
        },
      ],
    }).compile();
    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('formMaker', () => {
    const append = jest.spyOn(formData.prototype, 'append');
    it('should call append', () => {
      service.formMaker(templateOptions);
      expect(append).toBeCalledTimes(5);
    });

    it('it should called formMaker', async () => {
      await service.send(templateOptions);
      expect(append).toBeCalled();
      expect(got.post).toBeCalled();
      expect(got.post).toBeCalledWith(
        'https://api.mailgun.net/v3/domain/messages',
        expect.any(Object),
      );
    });

    it('it should throw error', async () => {
      try {
        jest.spyOn(got, 'post').mockImplementation(() => {
          throw new Error('');
        });
        await service.send(templateOptions);
      } catch (err) {
        expect(err).toStrictEqual(new Error(''));
      }
    });
  });
});
