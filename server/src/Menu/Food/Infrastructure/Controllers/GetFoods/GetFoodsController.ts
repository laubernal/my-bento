import { Controller, Get, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { GetFoodsQuery } from 'src/Menu/Food/Application/GetFoods/GetFoodsQuery';

@Controller()
export class GetFoodsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('api/foods')
  public async post(@Res() res: Response) {
    try {
      const query = GetFoodsQuery.fromJson();

      await this.queryBus.execute(query);

      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
