import { ErrorCode, ErrorSerialization } from "Shared/Domain/constants";

export abstract class DomainError extends Error {
  public abstract errorCode: ErrorCode;

  public readonly occurredOn: Date = new Date();

  protected constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }

  public serialize(): ErrorSerialization[] {
    return [
      {
        errorType: this.constructor.name,
        errorCode: this.errorCode,
        occurredOn: this.occurredOn,
        message: this.message,
        stack: this.stack?.split('\n').map((trace: string) => trace.trim())
      }
    ]
  };
}