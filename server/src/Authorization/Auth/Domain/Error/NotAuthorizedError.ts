import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "Shared/Domain/Error/DomainError";


export class NotAuthorizedError extends DomainError {
  public errorCode = ErrorCode.AUTHORIZATION_ERROR;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}