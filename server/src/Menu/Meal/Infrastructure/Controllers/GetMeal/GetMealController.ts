import {Controller, Get, Headers, Inject, Param, Res} from '@nestjs/common';
import {QueryBus} from '@nestjs/cqrs';
import {Response} from 'express';
import {GetMealParams} from './GetMealParams';
import {IMyBentoLogger} from 'Shared/Domain/Interfaces/IMyBentoLogger';
import {MY_BENTO_LOGGER} from 'Shared/Domain/InterfacesConstants';
import {MyBentoResponse} from 'Shared/Domain/MyBentoResponse';
import {GetMealQuery} from 'Menu/Meal/Application/GetMeal/GetMealQuery';
import {GetMealResponse} from 'Menu/Meal/Application/GetMeal/GetMealResponse';
import {GetFoodsResponse} from "Menu/Food/Application/GetFoods/GetFoodsResponse";
import {FullFoodInfo, MealFoodType, MealWithFullFoodInfo} from "Menu/Shared/Domain/types";
import {GetFoodsByIdsQuery} from "Menu/Food/Application/GetFoodsByIds/GetFoodsByIdsQuery";
import {GetMealDto} from "Menu/Meal/Infrastructure/Controllers/GetMeal/GetMealDto";

@Controller()
export class GetMealController {
    constructor(
        private readonly queryBus: QueryBus,
        @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
    ) {
    }

    @Get('api/meals/:id')
    public async get(
        @Param() params: GetMealParams,
        @Headers('traceId') traceId: string,
        @Res() res: Response
    ) {
        try {
            this.logger.log('Starting to get meal', [traceId]);

            const query = GetMealQuery.fromJson(params, traceId);

            const response = await this.queryBus.execute<GetMealQuery, GetMealResponse>(query);

            const matchingFoods = await this.findFoods(traceId, response);

            this.logger.log('Sending found meal', [traceId]);

            const meal = this.appendFoodsToMealFoods(response, matchingFoods);

            const myBentoResponse = new MyBentoResponse<GetMealDto>(meal, {
                success: true,
                error: null,
            });

            return res.status(200).json(myBentoResponse);
        } catch (error: any) {
            this.logger.error(`Error getting meal: ${error.message}`, [traceId]);

            const myBentoResponse = new MyBentoResponse<null>(null, {
                success: false,
                error: error.message,
            });

            return res.status(400).json(myBentoResponse);
        }
    }

    private async findFoods(traceId: string, meal: GetMealResponse): Promise<GetFoodsResponse[]> {
        const foodIds = Array.from(
            new Set(
                meal.foods.map((food: MealFoodType) => food.foodId.toString())
            )
        );

        if (!foodIds.length) return [];

        const query: GetFoodsByIdsQuery = GetFoodsByIdsQuery.fromJson(traceId, foodIds);

        return await this.queryBus.execute<GetFoodsByIdsQuery, GetFoodsResponse[]>(query);
    }

    private appendFoodsToMealFoods(meal: GetMealResponse, foods: GetFoodsResponse[]): GetMealDto {
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

        const mealWithFullFoodInfo: MealWithFullFoodInfo = {...meal, foods: fullFoodInfo};


        return GetMealDto.toPresenter(mealWithFullFoodInfo)

    }
}
