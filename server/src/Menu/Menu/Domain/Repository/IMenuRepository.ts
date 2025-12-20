import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { Menu } from '../Entity/Menu';
import {MenuFilter} from 'Menu/Menu/Domain/Filter/MenuFilter';

export interface IMenuRepository extends IRepository<Menu> {
    count(filter: MenuFilter): Promise<number>;
}
