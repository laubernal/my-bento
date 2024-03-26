import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "Shared/Domain/Error/DomainError";

export class RecordNotFoundError extends DomainError {
  public errorCode = ErrorCode.NOT_FOUND;

  constructor() {
    super('No record found with this criteria');

    Object.setPrototypeOf(this, RecordNotFoundError.prototype);
  }
}