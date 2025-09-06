import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { PostgreSqlAdapter } from 'Shared/Infrastructure/Persistance/Adapter/PostgreSqlAdapter';

export class PostgreSqlFoodFilterAdapter extends PostgreSqlAdapter {
  constructor(private filter: FoodFilter) {
    super();
  }

  public apply(): string {
    const filters = this.filter.apply();
    let conditions = [];
    let inClause = [];

    if (filters.has(FoodFilter.FOOD_NAME_FILTER)) {
      const name = filters.get(FoodFilter.FOOD_NAME_FILTER) as Name;

      conditions.push(`name = '${name.value}'`);
    }

    if (filters.has(FoodFilter.FOOD_ID_FILTER)) {
      const id = filters.get(FoodFilter.FOOD_ID_FILTER) as Id;

      conditions.push(`id  '${id.value}'`);
    }

    if (filters.has(FoodFilter.FOOD_IDS_FILTER)) {
      const ids = filters.get(FoodFilter.FOOD_IDS_FILTER) as Id[];

      const formattedIds = ids.map(id => `'${id.value}'`);

      inClause.push(`id IN (${formattedIds})`);
    }

    const whereClause = conditions.length || inClause.length ? `WHERE ${conditions.join(' AND ')} ${inClause.join(' ')}` : '';

    const orderByClause = this.applyOrderBy(filters);

    return `${whereClause} ${orderByClause}`.trim();
  }
}
