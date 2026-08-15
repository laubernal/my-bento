import { DomainError } from 'Shared/Domain/Error/DomainError';
import { ErrorCode } from 'Shared/Domain/constants';

export class MealAlreadyExistsError extends DomainError {
  public errorCode = ErrorCode.APPLICATION_ERROR;

  constructor() {
    super('Meal already exists error');

    Object.setPrototypeOf(this, MealAlreadyExistsError.prototype);
  }
}
