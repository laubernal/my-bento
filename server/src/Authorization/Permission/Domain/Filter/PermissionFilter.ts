import { Filter } from 'Shared/Domain/Entities/Filter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class PermissionFilter extends Filter {
  public static TENANT_ID_FILTER = 'tenantId';
  public static MODULE_ID_FILTER = 'moduleId';
  public static MODULE_NAME = 'moduleName';

  public static create(): PermissionFilter {
    return new PermissionFilter();
  }

  protected data: Map<string, any> = new Map();

  public withTenantId(id: Id): this {
    this.data.set(PermissionFilter.TENANT_ID_FILTER, id);
    return this;
  }

  public withModuleId(id: Id): this {
    this.data.set(PermissionFilter.MODULE_ID_FILTER, id);
    return this;
  }

  public withModuleName(name: Name): this {
    this.data.set(PermissionFilter.MODULE_NAME, name);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
