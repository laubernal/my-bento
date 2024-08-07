import { Controller, Get, Headers, Inject, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFoodsQuery } from 'Menu/Food/Application/GetFoods/GetFoodsQuery';
import { GetFoodsResponse } from 'Menu/Food/Application/GetFoods/GetFoodsResponse';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { MyBentoResponse } from 'Shared/Domain/MyBentoResponse';
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

      const response = await this.queryBus.execute<GetFoodsQuery, GetFoodsResponse[]>(query);

      this.logger.log('Sending found foods', [traceId]);

      const myBentoResponse = new MyBentoResponse<GetFoodsResponse[]>(response, {
        success: true,
        error: null,
      });

      res.status(200).send(myBentoResponse);
    } catch (error: any) {
      this.logger.error(`Error getting foods: ${error.message}`, [traceId]);

      const myBentoResponse = new MyBentoResponse<null>(null, {
        success: false,
        error: error.message,
      });

      return res.status(400).json(myBentoResponse);
    }
  }
}
