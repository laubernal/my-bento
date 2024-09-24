import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Meal } from './Meal';

export class Menu extends AggregateRoot {
  constructor(_id: Id, private _meals: Meal[], _createdAt?: Date, _updatedAt?: Date) {
    super(_id, _createdAt, _updatedAt);
  }

  public meals(): Meal[] {
    return this._meals;
  }
}
