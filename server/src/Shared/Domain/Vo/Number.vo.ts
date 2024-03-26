import { NumberFormatError } from "Shared/Domain/Error/NumberFormatError";
import { ValueObject } from "Shared/Domain/Vo/ValueObject";
import { z } from "zod";

export class NumberVo extends ValueObject {
  constructor(private readonly _value: number) {
    super();
    this.validate(_value);
  }

  protected validate(primitive: any): boolean {
    const number = z.number();
    try {
      number.parse(this._value);

      return true;
    }catch(error) {
      throw new NumberFormatError();
    }
  }

  get value(): number {
    return this._value;
  }

}