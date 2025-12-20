import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {Id} from "Shared/Domain/Vo/Id.vo";
import {Inject} from "@nestjs/common";
import {IMEAL_REPOSITORY} from 'Shared/Domain/InterfacesConstants';
import {GetMealsByIdsQuery} from 'Menu/Meal/Application/GetMealsByIds/GetMealsByIdsQuery';
import {GetMealsResponse} from 'Menu/Meal/Application/GetMeals/GetMealsResponse';
import {Meal} from 'Menu/Meal/Domain/Entity/Meal';
import {IMealRepository} from 'Menu/Meal/Domain/Repository/IMealRepository';
import {MealFilter} from 'Menu/Meal/Domain/Filter/MealFilter';

@QueryHandler(GetMealsByIdsQuery)
export class GetMealsByIdsQueryHandler implements IQueryHandler<GetMealsByIdsQuery, GetMealsResponse[]> {
    constructor(@Inject(IMEAL_REPOSITORY) private readonly repository: IMealRepository) {
    }
    
    public async execute(query: GetMealsByIdsQuery): Promise<GetMealsResponse[]> {
        const meals: Meal[] = await this.findMeals(query);
        
        return meals.map((meal: Meal) => {
            return GetMealsResponse.toResponse(meal);
        });
    }
    
    private async findMeals(query: GetMealsByIdsQuery): Promise<Meal[]> {
        const ids: Id[] = query.ids.map(id => new Id(id.trim()));
        
        const filter = MealFilter.create().withIds(ids);
        
        return this.repository.find(filter);
    }
    
}