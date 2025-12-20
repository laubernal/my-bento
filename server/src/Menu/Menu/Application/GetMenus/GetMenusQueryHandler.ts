import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetMenusQuery} from 'Menu/Menu/Application/GetMenus/GetMenusQuery';
import {Inject} from '@nestjs/common';
import {IMENU_REPOSITORY} from 'Shared/Domain/InterfacesConstants';
import {IMenuRepository} from 'Menu/Menu/Domain/Repository/IMenuRepository';
import {MenuFilter} from 'Menu/Menu/Domain/Filter/MenuFilter';
import {Pagination} from 'Shared/Domain/Entities/Pagination';
import {NumberVo} from 'Shared/Domain/Vo/Number.vo';
import {Order} from 'Shared/Domain/Entities/Order';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';
import {GetMenusResponse} from 'Menu/Menu/Application/GetMenus/GetMenusResponse';

@QueryHandler(GetMenusQuery)
export class GetMenusQueryHandler implements IQueryHandler<GetMenusQuery> {
    constructor(@Inject(IMENU_REPOSITORY) private readonly repository: IMenuRepository) {
    }
    
    public async execute(query: GetMenusQuery): Promise<{ data: GetMenusResponse[], totalCount: number }> {
        const [menus, totalCount] = await Promise.all([this.findMenus(query), this.getTotalCount(query)]);
        
        const response = menus.map((menu: Menu) => {
            return GetMenusResponse.toResponse(menu);
        });
        
        return {data: response, totalCount};
    }
    
    private buildFilter(query: GetMenusQuery): MenuFilter {
        const filter = MenuFilter.create();
        
        if (Object.entries(query.searchQuery).length) {
            const searchQueryKeys = Object.keys(query.searchQuery);
            
            if (searchQueryKeys.includes(Pagination.PAGE_FILTER)) {
                filter.paginate().setPage(new NumberVo(parseInt(query.searchQuery.page)));
            }
            
            if (searchQueryKeys.includes(Pagination.PER_PAGE_FILTER)) {
                filter.setPerPage(new NumberVo(parseInt(query.searchQuery.perPage)));
            }
            
            if (searchQueryKeys.includes(Order.ORDER_BY_FILTER)) {
                filter.order().orderBy(query.searchQuery.orderBy);
            }
            
            if (searchQueryKeys.includes(Order.ORDER_DIRECTION_FILTER)) {
                filter.orderDirection(query.searchQuery.orderDirection);
            }
        }
        
        return filter;
    }
    
    private async findMenus(query: GetMenusQuery): Promise<Menu[]> {
        const filter = this.buildFilter(query);
        
        return await this.repository.find(filter);
    }
    
    private async getTotalCount(query: GetMenusQuery): Promise<number> {
        const filter = this.buildFilter(query);
        
        return await this.repository.count(filter);
    }
    
}