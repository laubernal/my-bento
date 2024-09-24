import { BaseEntity } from 'Shared/Domain/Entities/BaseEntity';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';

export class Food extends BaseEntity {
  constructor(
    _id: Id,
    private readonly _foodId: Id,
    private readonly _quantity: Quantity,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public foodId(): Id {
    return this._foodId;
  }

  public quantity(): Quantity {
    return this._quantity;
  }
}
