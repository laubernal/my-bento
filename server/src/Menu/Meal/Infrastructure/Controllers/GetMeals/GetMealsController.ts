import { Controller, Get, Headers, Inject, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetMealsQuery } from 'Menu/Meal/Application/GetMeals/GetMealsQuery';
import { GetMealsResponse } from 'Menu/Meal/Application/GetMeals/GetMealsResponse';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { MyBentoResponse } from 'Shared/Domain/MyBentoResponse';
import { Response } from 'express';

@Controller()
export class GetMealsController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  @Get('/api/meals')
  public async get(@Headers('traceId') traceId: string, @Res() res: Response) {
    try {
      this.logger.log('Starting to get meals', [traceId]);

      const query = GetMealsQuery.fromJson(traceId);

      const response = await this.queryBus.execute<GetMealsQuery, GetMealsResponse[]>(query);

      this.logger.log('Sending found meals', [traceId]);

      const myBentoResponse = new MyBentoResponse<GetMealsResponse[]>(response, {
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
}
