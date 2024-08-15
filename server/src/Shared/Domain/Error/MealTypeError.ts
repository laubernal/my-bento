import { ErrorCode } from 'Shared/Domain/constants';
import { DomainError } from './DomainError';

export class MealTypeError extends DomainError {
  public errorCode = ErrorCode.DATA_FORMAT;

  constructor() {
    super('Meal type is not correct');

    Object.setPrototypeOf(this, MealTypeError.prototype);
  }
}
