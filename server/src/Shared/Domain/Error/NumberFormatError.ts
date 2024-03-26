import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "./DomainError";

export class NumberFormatError extends DomainError {
  public errorCode = ErrorCode.DATA_FORMAT;

  constructor() {
    super('Must be a number');

    Object.setPrototypeOf(this, NumberFormatError.prototype);
  }
}