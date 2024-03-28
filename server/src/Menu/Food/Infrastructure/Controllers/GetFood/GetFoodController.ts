import { Controller, Get, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { GetFoodQuery } from 'src/Menu/Food/Application/GetFood/GetFoodQuery';
import { GetFoodParams } from './GetFoodParams';

@Controller()
export class GetFoodController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('api/foods/:id')
  public async get(@Param() params: GetFoodParams, @Res() res: Response) {
    try {
      const query = GetFoodQuery.fromJson(params);

      const response = await this.queryBus.execute(query);

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
