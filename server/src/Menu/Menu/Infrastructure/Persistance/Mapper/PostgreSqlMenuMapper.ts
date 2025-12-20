import {IMapper} from 'Shared/Domain/Interfaces/IMapper';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';
import {MenuModel} from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MenuModel';
import {MenuMealModel} from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MenuMealModel';
import {Meal} from 'Menu/Menu/Domain/Entity/Meal';
import {Id} from 'Shared/Domain/Vo/Id.vo';

export class PostgreSqlMenuMapper implements IMapper<Menu, MenuModel> {
    public toModel(entity: Menu): MenuModel {
        const meals: MenuMealModel[] = entity.meals().map((meal: Meal) => {
            return {
                id: meal.id().value,
                meal_id: meal.meal().value,
                menu_id: entity.id().value,
                date: meal.date(),
                created_at: meal.createdAt(),
                updated_at: meal.updatedAt()
            };
        });
        
        return {
            id: entity.id().value,
            meals: meals,
            created_at: entity.createdAt(),
            updated_at: entity.updatedAt()
        };
    }
    
    public toDomain(model: MenuModel): Menu {
        const meals = model.meals.map((meal: MenuMealModel) => {
            return new Meal(new Id(meal.id), meal.date, new Id(meal.meal_id), meal.created_at, meal.updated_at);
        })
        
        return new Menu(new Id(model.id), meals, model.created_at, model.updated_at);
    }
    
    public queryResultToModel(result: { rows: any[]; rowCount: number | null }): {
        [key: string]: MenuModel;
    } {
        const menusMap: { [key: string]: MenuModel } = {};
        result.rows.forEach(row => {
            const menuId = row.id;
            
            if (!menusMap[menuId]) {
                menusMap[menuId] = {
                    id: row.id,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    meals: [],
                };
            }
            
            if (row.menumeal_id) {
                menusMap[menuId].meals.push({
                                                id: row.menumeal_id,
                                                meal_id: row.menumeal_meal,
                                                menu_id: row.menumeal_food,
                                                date: row.menumeal_date,
                                                created_at: row.menumeal_created_at,
                                                updated_at: row.menumeal_updated_at,
                                            });
            }
        });
        
        return menusMap;
    }
    
}