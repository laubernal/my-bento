import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { MikroOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/MikroOrmAdapter';

export class MikroOrmMealFilterAdapter extends MikroOrmAdapter {
  constructor(private filter: MealFilter) {
    super();
  }

  public apply(): any {
    const filters = this.filter.apply();

    if (filters.has(MealFilter.MEAL_NAME_FILTER)) {
      const name = filters.get(MealFilter.MEAL_NAME_FILTER) as Name;

      this.assign({ name: name.value });
    }

    if (filters.has(MealFilter.MEAL_ID_FILTER)) {
      const id = filters.get(MealFilter.MEAL_ID_FILTER) as Id;

      this.assign({ id: id.value });
    }

    return this.applyOrderBy(filters);
  }
}
