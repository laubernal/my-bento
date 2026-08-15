import {Controller, Get, Headers, Query, Res} from '@nestjs/common';
import {QueryBus} from '@nestjs/cqrs';
import {Response} from 'express';
import {GetMealsResponse} from 'Menu/Meal/Application/GetMeals/GetMealsResponse';
import {MyBentoResponse} from 'Shared/Domain/MyBentoResponse';
import {
    FullMenuMealInfo,
    MenuMealType, MenuWithFullMealInfo
} from 'Menu/Shared/Domain/types';
import {GetMenusQuery} from 'Menu/Menu/Application/GetMenus/GetMenusQuery';
import {GetMenusResponse} from 'Menu/Menu/Application/GetMenus/GetMenusResponse';
import {GetMenusDto} from 'Menu/Menu/Infrastructure/Controllers/GetMenus/GetMenusDto';
import {GetMealsByIdsQuery} from 'Menu/Meal/Application/GetMealsByIds/GetMealsByIdsQuery';

@Controller()
export class GetMenusController {
    constructor(
        private readonly queryBus: QueryBus
    ) {
    }
    
    @Get('/api/menus')
    public async get(
        @Headers('traceId') traceId: string,
        @Res() res: Response,
        @Query() requestQuery: Record<string, string>
    ) {
        try {
            
            const query = GetMenusQuery.fromJson(traceId, requestQuery);
            
            const response = await this.queryBus.execute<GetMenusQuery, {
                data: GetMenusResponse[],
                totalCount: number
            }>(query);
            
            const matchingMeals = await this.findMeals(traceId, response.data);
            
            const menus = this.appendMealsToMenuMeals(response.data, matchingMeals);
            
            const myBentoResponse = new MyBentoResponse<{ data: GetMenusDto[], totalCount: number }>({
                                                                                                         data: menus,
                                                                                                         totalCount: response.totalCount
                                                                                                     }, {
                                                                                                         success: true,
                                                                                                         error: null
                                                                                                     });
            res.status(200).send(myBentoResponse);
        } catch (error: any) {
            const myBentoResponse = new MyBentoResponse<null>(null, {
                success: false,
                error: error.message
            });
            
            return res.status(400).json(myBentoResponse);
        }
    }
    
    private async findMeals(traceId: string, menus: GetMenusResponse[]): Promise<GetMealsResponse[]> {
        const mealIds = Array.from(
            new Set(
                menus.flatMap(menu => menu.meals.map((meal: MenuMealType) => meal.mealId.toString()))
            )
        );
        
        if (!mealIds.length) {
            return [];
        }
        
        const query: GetMealsByIdsQuery = GetMealsByIdsQuery.fromJson(traceId, mealIds);
        
        return await this.queryBus.execute<GetMealsByIdsQuery, GetMealsResponse[]>(query);
    }
    
    private appendMealsToMenuMeals(menus: GetMenusResponse[], meals: GetMealsResponse[]): GetMenusDto[] {
        type MenuMealResponseType = {
            id: string,
            name: string,
            type: string,
        }
        
        const mealMap: Map<string, MenuMealResponseType> = meals.reduce<Map<string, MenuMealResponseType>>(
            (acc: Map<string, MenuMealResponseType>, meal: GetMealsResponse) => {
                acc.set(meal.id.toString(), {
                    id: meal.id,
                    name: meal.name,
                    type: meal.type
                });
                return acc;
            },
            new Map()
        );
        
        const menusWithMeals: MenuWithFullMealInfo[] = menus.map((menu: GetMenusResponse) => {
            const menuMeal: FullMenuMealInfo[] = menu.meals.map((meal: MenuMealType) => {
                const mealInfo = mealMap.get(meal.mealId);
                
                return {
                    id: meal.mealId.toString(),
                    name: mealInfo ? mealInfo.name : null,
                    type: mealInfo ? mealInfo.type : null,
                    date: meal.date.toISOString()
                };
            });
            
            return {...menu, meals: menuMeal};
        });
        
        return menusWithMeals.map((meal: MenuWithFullMealInfo) => {
            return GetMenusDto.toPresenter(meal);
        });
    }
}