import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';

export class Permission extends AggregateRoot {
  public static build(tenantId: Id, moduleId: Id, moduleName: Name, moduleUrl: Url[]): Permission {
    return new Permission(
      Id.generate(),
      tenantId,
      moduleId,
      moduleName,
      moduleUrl,
      new Date(),
      new Date()
    );
  }

  constructor(
    _id: Id,
    private _tenantId: Id,
    private _moduleId: Id,
    private _moduleName: Name,
    private _moduleUrl: Url[],
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id);
  }

  public tenantId(): Id {
    return this._tenantId;
  }

  public moduleId(): Id {
    return this._moduleId;
  }

  public moduleName(): Name {
    return this._moduleName;
  }

  public moduleUrl(): Url[] {
    return this._moduleUrl;
  }
}
