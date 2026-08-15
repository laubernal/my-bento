import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetMenuQuery} from 'Menu/Menu/Application/GetMenu/GetMenuQuery';
import {Id} from 'Shared/Domain/Vo/Id.vo';
import {RecordNotFoundError} from 'Shared/Domain/Error/RecordNotFoundError';
import {MenuFilter} from 'Menu/Menu/Domain/Filter/MenuFilter';
import {Inject} from '@nestjs/common';
import {IMENU_REPOSITORY} from 'Shared/Domain/InterfacesConstants';
import {IMenuRepository} from 'Menu/Menu/Domain/Repository/IMenuRepository';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';
import {GetMenuResponse} from 'Menu/Menu/Application/GetMenu/GetMenuResponse';

@QueryHandler(GetMenuQuery)
export class GetMenuQueryHandler implements IQueryHandler<GetMenuQuery> {
    constructor(@Inject(IMENU_REPOSITORY) private readonly repository: IMenuRepository) {
    }
    
    public async execute(query: GetMenuQuery): Promise<GetMenuResponse> {
        const id = new Id(query.id);
        
        const menu = await this.findMenu(id);
        
        return GetMenuResponse.toResponse(menu);
    }
    
    private async findMenu(id: Id): Promise<Menu> {
        const filter = MenuFilter.create().withId(id);
        
        const result = await this.repository.findOne(filter);
        
        if (typeof result === 'undefined') {
            throw new RecordNotFoundError();
        }
        
        return result;
    }
}