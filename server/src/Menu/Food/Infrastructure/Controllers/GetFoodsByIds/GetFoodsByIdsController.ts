import {Controller, Get, Headers, Query, Res} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {Response} from "express";
import {GetFoodsResponse} from "Menu/Food/Application/GetFoods/GetFoodsResponse";
import {MyBentoResponse} from "Shared/Domain/MyBentoResponse";
import {GetFoodsByIdsQuery} from "Menu/Food/Application/GetFoodsByIds/GetFoodsByIdsQuery";

@Controller()
export class GetFoodsByIdsController {
    constructor(private readonly queryBus: QueryBus) {
    }

    @Get('/api/foods-by-ids')
    public async get(@Headers('traceId') traceId: string, @Query('ids') ids: string, @Res() res: Response) {
        try {
            const query = GetFoodsByIdsQuery.fromJson(traceId, ids.split(','));

            const response = await this.queryBus.execute<GetFoodsByIdsQuery, GetFoodsResponse[]>(query);

            const myBentoResponse = new MyBentoResponse<GetFoodsResponse[]>(response, {
                success: true,
                error: null,
            });

            res.status(200).send(myBentoResponse);
        } catch (error: any) {
            const myBentoResponse = new MyBentoResponse<null>(null, {
                success: false,
                error: error.message,
            });

            return res.status(400).json(myBentoResponse);
        }
    }
}