import { Filter } from 'Shared/Domain/Entities/Filter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class FoodFilter extends Filter {
  public static FOOD_NAME_FILTER = 'food';
  public static FOOD_ID_FILTER = 'id';

  public static create(): FoodFilter {
    return new FoodFilter();
  }

  protected data: Map<string, any> = new Map();

  public withName(name: Name): this {
    this.data.set(FoodFilter.FOOD_NAME_FILTER, name);
    return this;
  }

  public withId(id: Id): this {
    this.data.set(FoodFilter.FOOD_ID_FILTER, id);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
