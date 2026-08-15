import {MenuMealModel} from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MenuMealModel';

export interface MenuModel {
    id: string;
    meals: MenuMealModel[];
    created_at: Date;
    updated_at: Date;
}