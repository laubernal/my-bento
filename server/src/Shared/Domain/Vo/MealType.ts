import { MealTypeError } from '../Error/MealTypeError';
import { StringVo } from './String.vo';

export enum MealTypeEnum {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
}

export class MealType {
  constructor(private _mealType: StringVo) {
    this.validate();
  }

  get value(): string {
    return this._mealType.value;
  }

  private validate() {
    if (!Object.values(MealTypeEnum).includes(this._mealType.value as MealTypeEnum)) {
      throw new MealTypeError();
    }
  }
}
