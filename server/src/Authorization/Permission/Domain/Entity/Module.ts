import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';

export class Module extends AggregateRoot {
  public static build(name: Name, urlList: Url[]): Module {
    return new Module(Id.generate(), name, urlList, new Date(), new Date());
  }

  constructor(
    _id: Id,
    private _name: Name,
    private _urlList: Url[],
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id);
  }

  public name(): Name {
    return this._name;
  }

  public urlList(): Url[] {
    return this._urlList;
  }
}
