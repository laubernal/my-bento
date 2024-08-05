import { Controller, Delete, Headers, Inject, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { DeleteFoodParams } from './DeleteFoodParams';
import { DeleteFoodCommand } from 'src/Menu/Food/Application/DeleteFood/DeleteFoodCommand';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/constants';

@Controller()
export class DeleteFoodController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  @Delete('api/foods/:id')
  public async post(
    @Param() params: DeleteFoodParams,
    @Headers('traceId') traceId: string,
    @Res() res: Response
  ) {
    try {
      this.logger.log('Starting to delete food', [traceId]);

      const command = DeleteFoodCommand.fromJson(params, traceId);

      await this.commandBus.execute(command);

      return res.status(200).json({});
    } catch (error: any) {
      this.logger.error(`Error deleting food: ${error.message}`, [traceId]);

      return res.status(400).json({ error: error.message });
    }
  }
}
