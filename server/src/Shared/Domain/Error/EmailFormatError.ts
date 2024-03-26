import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "./DomainError";

export class EmailFormatError extends DomainError {
  public errorCode = ErrorCode.DATA_FORMAT;

  constructor() {
    super('Email must have the correct format');

    Object.setPrototypeOf(this, EmailFormatError.prototype);
  }
}