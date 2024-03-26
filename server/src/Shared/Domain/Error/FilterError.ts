import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "Shared/Domain/Error/DomainError";

export class FilterError extends DomainError {
  public errorCode = ErrorCode.APPLICATION_ERROR;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, FilterError.prototype);
  }
}