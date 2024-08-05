import { Controller, Get, Headers, Inject, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFoodsQuery } from 'Menu/Food/Application/GetFoods/GetFoodsQuery';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { Response } from 'express';

@Controller()
export class GetFoodsController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  @Get('/api/foods')
  public async get(@Headers('traceId') traceId: string, @Res() res: Response) {
    try {
      this.logger.log('Starting to get foods', [traceId]);

      const query = GetFoodsQuery.fromJson(traceId);

      const response = await this.queryBus.execute(query);

      this.logger.log('Sending found foods', [traceId]);
      res.status(200).send(response);
    } catch (error: any) {
      this.logger.error(`Error getting foods: ${error.message}`, [traceId]);

      return res.status(400).json({ error: error.message });
    }
  }
}
