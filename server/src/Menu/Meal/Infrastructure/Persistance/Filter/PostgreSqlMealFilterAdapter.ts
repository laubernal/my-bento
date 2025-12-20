import {MealFilter} from 'Menu/Meal/Domain/Filter/MealFilter';
import {Id} from 'Shared/Domain/Vo/Id.vo';
import {MealType} from 'Shared/Domain/Vo/MealType';
import {Name} from 'Shared/Domain/Vo/Name.vo';
import {PostgreSqlAdapter} from 'Shared/Infrastructure/Persistance/Adapter/PostgreSqlAdapter';

export class PostgreSqlMealFilterAdapter extends PostgreSqlAdapter {
    constructor(private filter: MealFilter) {
        super();
    }
    
    public apply(): any {
        const filters = this.filter.apply();
        const conditions = [];
        let inClause = [];
        
        if (filters.has(MealFilter.MEAL_NAME_FILTER)) {
            const name = filters.get(MealFilter.MEAL_NAME_FILTER) as Name;
            
            conditions.push(`meals.name ILIKE '%${name.value}%'`);
        }
        
        if (filters.has(MealFilter.MEAL_TYPE_FILTER)) {
            const type = filters.get(MealFilter.MEAL_TYPE_FILTER) as MealType;
            
            conditions.push(`meals.type = '${type.value}'`);
        }
        
        if (filters.has(MealFilter.MEAL_ID_FILTER)) {
            const id = filters.get(MealFilter.MEAL_ID_FILTER) as Id;
            
            conditions.push(`meals.id = '${id.value}'`);
        }
        
        if (filters.has(MealFilter.MEAL_IDS_FILTER)) {
            const ids = filters.get(MealFilter.MEAL_IDS_FILTER) as Id[];
            
            const formattedIds = ids.map(id => `'${id.value}'`);
            
            inClause.push(`id IN (${formattedIds})`);
        }
        
        const whereClause = conditions.length || inClause.length ?
            `WHERE ${conditions.join(' AND ')} ${inClause.join(' ')}` : '';
        
        const orderByClause = this.applyOrderBy(filters);
        const paginationClause = this.applyPagination(filters);
        
        return `${whereClause} ${orderByClause} ${paginationClause}`.trim();
    }
}
