import { Body, Controller, Param, Put, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { UpdateFoodCommand } from 'src/Menu/Food/Application/UpdateFood/UpdateFoodCommand';
import { UpdateFoodParams } from './UpdateFoodParams';
import { UpdateFoodApiRequest } from './UpdateFoodApiRequest';

@Controller()
export class UpdateFoodController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put('api/foods/:id')
  public async post(
    @Param() params: UpdateFoodParams,
    @Body() body: UpdateFoodApiRequest,
    @Res() res: Response
  ) {
    try {
      const command = UpdateFoodCommand.fromJson(body, params);

      await this.commandBus.execute(command);

      return res.status(200).json({});
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
