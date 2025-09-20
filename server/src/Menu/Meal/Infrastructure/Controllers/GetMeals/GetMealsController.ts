import {Controller, Get, Headers, Inject, Query, Res} from '@nestjs/common';
import {QueryBus} from '@nestjs/cqrs';
import {GetMealsQuery} from 'Menu/Meal/Application/GetMeals/GetMealsQuery';
import {GetMealsResponse} from 'Menu/Meal/Application/GetMeals/GetMealsResponse';
import {IMyBentoLogger} from 'Shared/Domain/Interfaces/IMyBentoLogger';
import {MY_BENTO_LOGGER} from 'Shared/Domain/InterfacesConstants';
import {MyBentoResponse} from 'Shared/Domain/MyBentoResponse';
import {Response} from 'express';
import {GetFoodsResponse} from "Menu/Food/Application/GetFoods/GetFoodsResponse";
import {GetFoodsByIdsQuery} from "Menu/Food/Application/GetFoodsByIds/GetFoodsByIdsQuery";
import {FullFoodInfo, MealFoodType, MealWithFullFoodInfo} from "Menu/Shared/Domain/types";
import {GetMealsDto} from "Menu/Meal/Infrastructure/Controllers/GetMeals/GetMealsDto";

@Controller()
export class GetMealsController {
    constructor(
        private readonly queryBus: QueryBus,
        @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
    ) {
    }

    @Get('/api/meals')
    public async get(
        @Headers('traceId') traceId: string,
        @Res() res: Response,
        @Query() requestQuery: Record<string, string>
    ) {
        try {
            this.logger.log('Starting to get meals', [traceId]);

            const query = GetMealsQuery.fromJson(traceId, requestQuery);

            const response = await this.queryBus.execute<GetMealsQuery, {
                data: GetMealsResponse[],
                totalCount: number
            }>(query);

            const matchingFoods = await this.findFoods(traceId, response.data);

            this.logger.log('Sending found meals', [traceId]);

            const meals = this.appendFoodsToMealFoods(response.data, matchingFoods);

            const myBentoResponse = new MyBentoResponse<{ data: GetMealsDto[], totalCount: number }>({
                data: meals,
                totalCount: response.totalCount
            }, {
                success: true,
                error: null,
            });

            res.status(200).send(myBentoResponse);
        } catch (error: any) {
            this.logger.error(`Error getting meals: ${error.message}`, [traceId]);

            const myBentoResponse = new MyBentoResponse<null>(null, {
                success: false,
                error: error.message,
            });

            return res.status(400).json(myBentoResponse);
        }
    }

    private async findFoods(traceId: string, meals: GetMealsResponse[]): Promise<GetFoodsResponse[]> {
        const foodIds = Array.from(
            new Set(
                meals.flatMap(meal => meal.foods.map((food: MealFoodType) => food.foodId.toString()))
            )
        );

        if (!foodIds.length) return [];

        const query: GetFoodsByIdsQuery = GetFoodsByIdsQuery.fromJson(traceId, foodIds);

        return await this.queryBus.execute<GetFoodsByIdsQuery, GetFoodsResponse[]>(query);
    }

    private appendFoodsToMealFoods(meals: GetMealsResponse[], foods: GetFoodsResponse[]): GetMealsDto[] {
        const foodMap: Map<string, { name: string; category: string }> = foods.reduce<Map<string, {
            name: string;
            category: string
        }>>(
            (acc: Map<string, { name: string; category: string }>, food: GetFoodsResponse) => {
                acc.set(food.id.toString(), {name: food.name, category: food.category});
                return acc;
            },
            new Map(),
        );

        const mealsWithFoods: MealWithFullFoodInfo[] = meals.map((meal: GetMealsResponse) => {
            const fullFoodInfo: FullFoodInfo[] = meal.foods.map((food: MealFoodType) => {
                const foodInfo = foodMap.get(food.foodId);

                return {
                    id: food.id.toString(),
                    foodId: food.foodId.toString(),
                    name: foodInfo ? foodInfo.name : null,
                    category: foodInfo ? foodInfo.category : null,
                    amount: food.amount,
                    unit: food.unit.toString(),
                }
            });

            return {...meal, foods: fullFoodInfo};
        });

        return mealsWithFoods.map((meal: MealWithFullFoodInfo) => {
            return GetMealsDto.toPresenter(meal)
        })
    }
}
