import { StringFormatError } from 'Shared/Domain/Error/StringFormatError';
import { ValueObject } from 'Shared/Domain/Vo/ValueObject';
import { z } from 'zod';

export class StringVo extends ValueObject {
  constructor(private readonly _value: string) {
    super();
    this.validate();
  }

  protected validate(): boolean {
    const string = z.string();
    try {
      string.parse(this._value);

      return true;
    } catch (error) {
      throw new StringFormatError();
    }
  }

  get value(): string {
    return this._value;
  }
}
