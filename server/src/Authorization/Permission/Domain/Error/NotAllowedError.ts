import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from 'Shared/Domain/Error/DomainError';

export class NotAllowedError extends DomainError {
  public errorCode = ErrorCode.AUTHORIZATION_ERROR;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, NotAllowedError.prototype);
  }
}
