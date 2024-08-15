import { UnitFormatError } from '../Error/UnitFormatError';
import { StringVo } from './String.vo';

export enum UnitEnum {
  GRAMS = 'grams',
  KILOGRAMS = 'kilograms',
}

export class Unit {
  constructor(private _unit: StringVo) {
    this.validate();
  }

  get value(): string {
    return this._unit.value;
  }

  private validate() {
    if (!Object.values(UnitEnum).includes(this._unit.value as UnitEnum)) {
      throw new UnitFormatError();
    }
  }
}
