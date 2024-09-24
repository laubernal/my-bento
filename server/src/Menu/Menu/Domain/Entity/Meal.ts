import { BaseEntity } from 'Shared/Domain/Entities/BaseEntity';
import { Id } from 'Shared/Domain/Vo/Id.vo';

export class Meal extends BaseEntity {
  constructor(
    _id: Id,
    private readonly _date: Date,
    private readonly _meal: Id,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public date(): Date {
    return this._date;
  }

  public meal(): Id {
    return this._meal;
  }
}
