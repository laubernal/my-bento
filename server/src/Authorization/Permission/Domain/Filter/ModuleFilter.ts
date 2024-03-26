import { Filter } from 'Shared/Domain/Entities/Filter';
import { Id } from 'Shared/Domain/Vo/Id.vo';

export class ModuleFilter extends Filter {
  public static MODULE_ID_FILTER = 'moduleId';

  public static create(): ModuleFilter {
    return new ModuleFilter();
  }

  protected data: Map<string, any> = new Map();

  public withModuleId(id: Id): this {
    this.data.set(ModuleFilter.MODULE_ID_FILTER, id);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
