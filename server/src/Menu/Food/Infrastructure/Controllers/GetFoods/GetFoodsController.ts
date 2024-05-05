import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetFoodsQuery } from 'Menu/Food/Application/GetFoods/GetFoodsQuery';
import { Response } from 'express';

@Controller()
export class GetFoodsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/api/foods')
  public async get(@Res() res: Response) {
    try {
      throw new Error('sdfadfa');
      const query = GetFoodsQuery.fromJson();

      const response = await this.queryBus.execute(query);

      res.status(200).send(response);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
