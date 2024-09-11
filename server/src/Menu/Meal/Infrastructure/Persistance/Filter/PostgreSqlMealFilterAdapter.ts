import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { PostgreSqlAdapter } from 'Shared/Infrastructure/Persistance/Adapter/PostgreSqlAdapter';

export class PostgreSqlMealFilterAdapter extends PostgreSqlAdapter {
  constructor(private filter: MealFilter) {
    super();
  }

  public apply(): any {
    const filters = this.filter.apply();
    const conditions = [];

    if (filters.has(MealFilter.MEAL_NAME_FILTER)) {
      const name = filters.get(MealFilter.MEAL_NAME_FILTER) as Name;

      conditions.push(`meals.name = '${name.value}'`);
    }

    if (filters.has(MealFilter.MEAL_ID_FILTER)) {
      const id = filters.get(MealFilter.MEAL_ID_FILTER) as Id;

      conditions.push(`meals.id = '${id.value}'`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const orderByClause = this.applyOrderBy(filters);

    return `${whereClause} ${orderByClause}`.trim();
  }
}