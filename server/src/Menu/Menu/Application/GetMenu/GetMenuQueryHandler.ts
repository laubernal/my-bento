import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMenuQuery } from './GetMenuQuery';
import { Inject } from '@nestjs/common';
import { IMENU_REPOSITORY } from 'Shared/Domain/InterfacesConstants';
import { IMenuRepository } from 'Menu/Menu/Domain/Repository/IMenuRepository';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Menu } from 'Menu/Menu/Domain/Entity/Menu';
import { MenuFilter } from 'Menu/Menu/Domain/Filter/MenuFilter';
import { GetMenuResponse } from './GetMenuResponse';

@QueryHandler(GetMenuQuery)
export class GetMenuQueryHandler implements IQueryHandler {
  constructor(@Inject(IMENU_REPOSITORY) private readonly repository: IMenuRepository) {}

  public async execute(query: GetMenuQuery): Promise<GetMenuResponse> {
    const id = new Id(query.id);

    const menu = await this.findMenu(id);

    return GetMenuResponse.toResponse(menu);
  }

  private async findMenu(id: Id): Promise<Menu> {
    const filter = MenuFilter.create().withId(id);

    const response = await this.repository.findOne(filter);

    if (typeof response === 'undefined') {
      throw new Error('Menu not exists');
    }

    return response;
  }
}
