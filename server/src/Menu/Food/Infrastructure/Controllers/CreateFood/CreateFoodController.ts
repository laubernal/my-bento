import { Body, Controller, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { CreateFoodCommand } from 'src/Menu/Food/Application/CreateFood/CreateFoodCommand';
import { CreateFoodApiRequest } from './CreateFoodApiRequest';

@Controller()
export class CreateFoodController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/api/foods')
  public async post(@Body() body: CreateFoodApiRequest, @Res() res: Response) {
    try {
      const command = CreateFoodCommand.fromJson(body);

      await this.commandBus.execute(command);

      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
