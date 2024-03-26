import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "./DomainError";

export class StringFormatError extends DomainError {
  public errorCode = ErrorCode.DATA_FORMAT;

  constructor() {
    super('Must be a string');

    Object.setPrototypeOf(this, StringFormatError.prototype);
  }
}