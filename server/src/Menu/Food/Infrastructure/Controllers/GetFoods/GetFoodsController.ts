import { Controller, Get, Headers, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFoodsQuery } from 'Menu/Food/Application/GetFoods/GetFoodsQuery';
import { MyBentoLogger } from 'Shared/Infrastructure/Logger/MyBentoLogger';
import { Response } from 'express';

@Controller()
export class GetFoodsController {
  constructor(private readonly queryBus: QueryBus, private readonly logger: MyBentoLogger) {}

  @Get('/api/foods')
  public async get(@Headers('traceId') traceId: string, @Res() res: Response) {
    try {
      this.logger.log('Starting to get foods', [traceId]);

      const query = GetFoodsQuery.fromJson(traceId);

      const response = await this.queryBus.execute(query);

      this.logger.log('Sending foods found', [traceId]);
      res.status(200).send(response);
    } catch (error: any) {
      this.logger.error(`Error getting foods: ${error.message}`, [traceId]);

      return res.status(400).json({ error: error.message });
    }
  }
}
