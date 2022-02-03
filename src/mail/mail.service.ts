import { MailOptions, TemplateOptions } from './mail.interface';
import { OPTIONS } from './../jwt/jwt.constants';
import { Inject, Injectable } from '@nestjs/common';
import got from 'got';
import * as FormData from 'form-data';

@Injectable()
export class MailService {
  constructor(@Inject(OPTIONS) private readonly options: MailOptions) {}

  formMaker(templates: TemplateOptions) {
    const variables = Object.keys(templates).map(
      (key) => `"${key}":"${templates[key]}"`,
    );
    const form = new FormData();
    form.append('to', 'fireking5997@gmail.com');
    form.append('subject', 'subject');
    form.append('from', `Pak <mail@${this.options.MAIL_DOMAIN}>`);
    form.append('template', 'authen');
    form.append('h:X-mailgun-Variables', `{${variables.join(',')}}`);
    return form;
  }

  async send(templates: TemplateOptions) {
    const form = this.formMaker(templates);
    try {
      await got.post(
        `https://api.mailgun.net/v3/${this.options.MAIL_DOMAIN}/messages`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.MAIL_KEY}`,
            ).toString('base64')}`,
          },
          method: 'POST',
          body: form,
        },
      );
    } catch (err) {}
  }
}
