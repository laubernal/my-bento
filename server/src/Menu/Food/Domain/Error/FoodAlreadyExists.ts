import { DomainError } from 'Shared/Domain/Error/DomainError';
import { ErrorCode } from 'Shared/Domain/constants';

export class FoodAlreadyExistsError extends DomainError {
  public errorCode = ErrorCode.APPLICATION_ERROR;

  constructor() {
    super('Food already exists error');

    Object.setPrototypeOf(this, FoodAlreadyExistsError.prototype);
  }
}
