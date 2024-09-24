import { Controller, Get, Headers, Inject, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { GetMealParams } from './GetMealParams';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { MyBentoResponse } from 'Shared/Domain/MyBentoResponse';
import { GetMealQuery } from 'Menu/Meal/Application/GetMeal/GetMealQuery';
import { GetMealResponse } from 'Menu/Meal/Application/GetMeal/GetMealResponse';

@Controller()
export class GetMealController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

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

      this.logger.log('Sending found meal', [traceId]);

      const myBentoResponse = new MyBentoResponse<GetMealResponse>(response, {
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
}
