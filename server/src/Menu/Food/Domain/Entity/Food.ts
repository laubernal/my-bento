import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { Category } from 'Shared/Domain/Vo/Category.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';

export class Food extends AggregateRoot {
  constructor(
    _id: Id,
    private readonly _name: Name,
    private readonly _category: Category,
    private readonly _quantity: Quantity,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(_id, createdAt, updatedAt);
  }

  public name(): Name {
    return this._name;
  }

  public category(): Category {
    return this._category;
  }

  public quantity(): Quantity {
    return this._quantity;
  }
}
