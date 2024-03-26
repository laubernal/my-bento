import { ValueObject } from "Shared/Domain/Vo/ValueObject";
import { Primitives } from "Shared/Infrastructure/Types";

export class NullableVo extends ValueObject {
  constructor(private _value: null) {super();}

  protected validate(primitive: Primitives): boolean {
    return primitive === null;
  }

  get value(): null {
    return this._value;
  }

}