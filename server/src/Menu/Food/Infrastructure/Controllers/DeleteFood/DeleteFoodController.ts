import { Body, Controller, Delete, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { DeleteFoodParams } from './DeleteFoodParams';
import { DeleteFoodCommand } from 'src/Menu/Food/Application/DeleteFood/DeleteFoodCommand';

@Controller()
export class DeleteFoodController {
  constructor(private readonly commandBus: CommandBus) {}

  @Delete('api/foods/:id')
  public async post(@Param() params: DeleteFoodParams, @Res() res: Response) {
    try {
      const command = DeleteFoodCommand.fromJson(params);

      await this.commandBus.execute(command);

      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
