import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { MealType } from 'Shared/Domain/Vo/MealType';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Food } from './Food';

export class Meal extends AggregateRoot {
  constructor(
    _id: Id,
    private readonly _name: Name,
    private readonly _type: MealType,
    private readonly _foods: Food[],
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public name(): Name {
    return this._name;
  }

  public type(): MealType {
    return this._type;
  }

  public foods(): Food[] {
    return this._foods;
  }
}
