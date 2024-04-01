import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { MikroOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/MikroOrmAdapter';

export class MikroOrmFoodFilterAdapter extends MikroOrmAdapter {
  constructor(private filter: FoodFilter) {
    super();
  }

  public apply(): any {
    const filters = this.filter.apply();

    if (filters.has(FoodFilter.FOOD_NAME_FILTER)) {
      const name = filters.get(FoodFilter.FOOD_NAME_FILTER) as Name;

      this.assign({ name: name.value });
    }

    if (filters.has(FoodFilter.FOOD_ID_FILTER)) {
      const id = filters.get(FoodFilter.FOOD_ID_FILTER) as Id;

      this.assign({ id: id.value });
    }

    return this.applyOrderBy(filters);
  }
}
