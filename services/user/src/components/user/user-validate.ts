import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

import { User } from './user-model';

/**
 * Custom validator class that checks
 * for unique fields during insert and update operations,
 * value is inserted value that is beign validated
 * and args object carries property (field) name
 */

@ValidatorConstraint({ name: 'isUniqueInDatabase', async: true })
export class IsUniqueInDatabase implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    return User.count({
      where: { [args.property]: value },
    }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}
