import { Filter } from 'Shared/Domain/Entities/Filter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class MealFilter extends Filter {
  public static MEAL_NAME_FILTER = 'meal';
  public static MEAL_ID_FILTER = 'id';

  public static create(): MealFilter {
    return new MealFilter();
  }

  protected data: Map<string, any> = new Map();

  public withName(name: Name): this {
    this.data.set(MealFilter.MEAL_NAME_FILTER, name);
    return this;
  }

  public withId(id: Id): this {
    this.data.set(MealFilter.MEAL_ID_FILTER, id);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
