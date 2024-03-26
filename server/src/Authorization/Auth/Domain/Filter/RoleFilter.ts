import { Filter } from 'Shared/Domain/Entities/Filter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { RoleType } from 'Shared/Domain/Vo/RoleType';

export class RoleFilter extends Filter {
  public static ROLE_ID_FILTER = 'id';
  public static ROLE_TYPE_FILTER = 'roleType';

  public static builder(): RoleFilter {
    return new RoleFilter();
  }

  protected data: Map<string, any> = new Map();

  public withRoleId(id: Id): this {
    this.data.set(RoleFilter.ROLE_ID_FILTER, id);
    return this;
  }

  public withRoleType(type: RoleType): this {
    this.data.set(RoleFilter.ROLE_TYPE_FILTER, type);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
