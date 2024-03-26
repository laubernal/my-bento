import { ErrorCode } from 'Shared/Domain/constants';
import { DomainError } from './DomainError';

export class UnitFormatError extends DomainError {
  public errorCode = ErrorCode.DATA_FORMAT;

  constructor() {
    super('Unit must have the correct format');

    Object.setPrototypeOf(this, UnitFormatError.prototype);
  }
}
