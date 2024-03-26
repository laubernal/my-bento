import { UnitFormatError } from '../Error/UnitFormatError';
import { StringVo } from './String.vo';

export class Unit {
  GRAMS = 'grams';
  KILOGRAMS = 'kilograms';

  constructor(private _unit: StringVo) {
    this.validate();
  }

  public unit(): StringVo {
    return this._unit;
  }

  private validate() {
    if (this._unit.value !== this.GRAMS || this._unit.value !== this.KILOGRAMS) {
      throw new UnitFormatError();
    }
  }
}
