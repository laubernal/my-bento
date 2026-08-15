import {PostgreSqlAdapter} from 'Shared/Infrastructure/Persistance/Adapter/PostgreSqlAdapter';
import {MenuFilter} from 'Menu/Menu/Domain/Filter/MenuFilter';
import {Id} from 'Shared/Domain/Vo/Id.vo';

export class PostgreSqlMenuFilterAdapter extends PostgreSqlAdapter  {
    constructor(private filter: MenuFilter) {
        super();
    }
    
    public apply(): any {
        const filters = this.filter.apply();
        const conditions = [];
        
        if (filters.has(MenuFilter.MENU_ID_FILTER)) {
            const id = filters.get(MenuFilter.MENU_ID_FILTER) as Id;
            
            conditions.push(`menus.id = '${id.value}'`);
        }
        
        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        
        const orderByClause = this.applyOrderBy(filters);
        const paginationClause = this.applyPagination(filters);
        
        return `${whereClause} ${orderByClause} ${paginationClause}`.trim();
    }
}