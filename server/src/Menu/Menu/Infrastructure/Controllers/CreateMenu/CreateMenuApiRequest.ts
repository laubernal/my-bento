import {MenuMealType} from 'Menu/Shared/Domain/types';

export interface CreateMenuApiRequest {
    id: string;
    meals: MenuMealType[];
}