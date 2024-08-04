import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { GetFoodQuery } from 'src/Menu/Food/Application/GetFood/GetFoodQuery';
import { GetFoodParams } from './GetFoodParams';
import { MyBentoLogger } from 'Shared/Infrastructure/Logger/MyBentoLogger';

@Controller()
export class GetFoodController {
  constructor(private readonly queryBus: QueryBus, private readonly logger: MyBentoLogger) {}

  @Get('api/foods/:id')
  public async get(
    @Param() params: GetFoodParams,
    @Headers('traceId') traceId: string,
    @Res() res: Response
  ) {
    try {
      this.logger.log('Starting to get food', [traceId]);

      const query = GetFoodQuery.fromJson(params, traceId);

      const response = await this.queryBus.execute(query);

      this.logger.log('Sending found food', [traceId]);
      return res.status(200).json(response);
    } catch (error: any) {
      this.logger.error(`Error getting food: ${error.message}`, [traceId]);

      return res.status(400).json({ error: error.message });
    }
  }
}
