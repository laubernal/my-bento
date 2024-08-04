import { Body, Controller, Headers, Param, Put, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { UpdateFoodCommand } from 'src/Menu/Food/Application/UpdateFood/UpdateFoodCommand';
import { UpdateFoodParams } from './UpdateFoodParams';
import { UpdateFoodApiRequest } from './UpdateFoodApiRequest';
import { MyBentoLogger } from 'Shared/Infrastructure/Logger/MyBentoLogger';

@Controller()
export class UpdateFoodController {
  constructor(private readonly commandBus: CommandBus, private readonly logger: MyBentoLogger) {}

  @Put('api/foods/:id')
  public async post(
    @Param() params: UpdateFoodParams,
    @Headers('traceId') traceId: string,
    @Body() body: UpdateFoodApiRequest,
    @Res() res: Response
  ) {
    try {
      this.logger.log('Starting to update food', [traceId]);

      const command = UpdateFoodCommand.fromJson(body, params, traceId);

      await this.commandBus.execute(command);

      return res.status(200).json({});
    } catch (error: any) {
      this.logger.error(`Error updating food: ${error.message}`, [traceId]);

      return res.status(400).json({ error: error.message });
    }
  }
}
