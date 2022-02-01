import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { getManager } from 'typeorm';
import { Users } from '../entities/users.entity';

export function IsEmailExist(options?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsEmailExist',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        async validate(value: any) {
          const user = getManager().getRepository(Users);
          const isExist = await user.count({ email: value });
          return !isExist;
        },
      },
    });
  };
}

export function IsPasswordSame(property: string, options?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsPasswordSame',
      target: object.constructor,
      propertyName,
      options,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [related] = args.constraints;
          const relatedValue = (args.object as any)[related];
          return relatedValue === value;
        },
      },
    });
  };
}
