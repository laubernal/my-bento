import { Amount } from './Amount.vo';
import { Unit } from './Unit.vo';

export class Quantity {
  constructor(private _amount: Amount, private _unit: Unit) {}

  public amount(): Amount {
    return this._amount;
  }

  public unit(): Unit {
    return this._unit;
  }
}
