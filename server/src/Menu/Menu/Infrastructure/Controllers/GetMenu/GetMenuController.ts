import {Controller, Get, Param, Res, Headers} from '@nestjs/common';
import {GetMenuParams} from 'Menu/Menu/Infrastructure/Controllers/GetMenu/GetMenuParams';
import {GetMenuQuery} from 'Menu/Menu/Application/GetMenu/GetMenuQuery';
import {QueryBus} from '@nestjs/cqrs';
import {GetMealsResponse} from 'Menu/Meal/Application/GetMeals/GetMealsResponse';
import {FullMenuMealInfo, MenuMealType, MenuWithFullMealInfo} from 'Menu/Shared/Domain/types';
import {GetMealsByIdsQuery} from 'Menu/Meal/Application/GetMealsByIds/GetMealsByIdsQuery';
import {GetMenuResponse} from 'Menu/Menu/Application/GetMenu/GetMenuResponse';
import {Response} from 'express';
import {GetMenuDto} from 'Menu/Menu/Infrastructure/Controllers/GetMenu/GetMenuDto';
import {MyBentoResponse} from 'Shared/Domain/MyBentoResponse';

@Controller()
export class GetMenuController {
    constructor(private readonly queryBus: QueryBus) {
    }
    
    @Get('/api/menus/:id')
    public async get(
        @Param() params: GetMenuParams,
        @Headers('traceId') traceId: string,
        @Res() res: Response): Promise<void> {
        const query = GetMenuQuery.fromJson(traceId, params.id);
        
        const response = await this.queryBus.execute<GetMenuQuery, GetMenuResponse
        >(query);
        console.log(response);
        
        const matchingMeals = await this.findMeals(traceId, response);
        
        const menu = this.appendMealsToMenuMeals(response, matchingMeals);
        
        const myBentoResponse = new MyBentoResponse<{ data: GetMenuDto, totalCount: number }>({
                                                                                                  data: menu,
                                                                                                  totalCount: 1
                                                                                              }, {
                                                                                                  success: true,
                                                                                                  error: null
                                                                                              });
        
        
        res.status(200).send(myBentoResponse);
    }
    
    private async findMeals(traceId: string, menu: GetMenuResponse): Promise<GetMealsResponse[]> {
        const mealIds = Array.from(
            new Set(
                menu.meals.map((meal: MenuMealType) => meal.mealId.toString())
            )
        );
        
        if (!mealIds.length) {
            return [];
        }
        
        const query: GetMealsByIdsQuery = GetMealsByIdsQuery.fromJson(traceId, mealIds);
        
        return await this.queryBus.execute<GetMealsByIdsQuery, GetMealsResponse[]>(query);
    }
    
    private appendMealsToMenuMeals(menu: GetMenuResponse, meals: GetMealsResponse[]): GetMenuDto {
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
        
        const menuMeals: FullMenuMealInfo[] = menu.meals.map((meal: MenuMealType) => {
            const mealInfo = mealMap.get(meal.mealId);
            console.log('meal', meal);
            return {
                id: meal.mealId.toString(),
                name: mealInfo ? mealInfo.name : null,
                type: mealInfo ? mealInfo.type : null,
                date: new Date(meal.date).toISOString()
            };
        });
        
        const menusWithMeals: MenuWithFullMealInfo = {...menu, meals: menuMeals};
        
        return GetMenuDto.toPresenter(menusWithMeals);
        
    }
}