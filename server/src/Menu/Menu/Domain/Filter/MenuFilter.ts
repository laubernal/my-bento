import { Filter } from 'Shared/Domain/Entities/Filter';
import { Id } from 'Shared/Domain/Vo/Id.vo';

export class MenuFilter extends Filter {
  public static MENU_ID_FILTER = 'id';

  public static create(): MenuFilter {
    return new MenuFilter();
  }

  protected data: Map<string, any> = new Map();

  public withId(id: Id): this {
    this.data.set(MenuFilter.MENU_ID_FILTER, id);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
