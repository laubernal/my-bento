import { Controller, Delete, Headers, Inject, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { DeleteFoodParams } from './DeleteFoodParams';
import { Response } from 'express';
import { MyBentoResponse } from 'Shared/Domain/MyBentoResponse';
import { DeleteFoodCommand } from 'Menu/Food/Application/DeleteFood/DeleteFoodCommand';

@Controller()
export class DeleteFoodController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  @Delete('/api/foods/:id')
  public async delete(
    @Param() params: DeleteFoodParams,
    @Headers('traceId') traceId: string,
    @Res() res: Response
  ) {
    try {
      this.logger.log(`Starting to delete food`, [traceId]);

      const command = DeleteFoodCommand.fromJson(params, traceId);

      await this.commandBus.execute(command);

      const myBentoResponse = new MyBentoResponse(null, {
        success: true,
        error: null,
      });

      return res.status(200).json(myBentoResponse);
    } catch (error: any) {
      this.logger.error(`Error deleting food: ${error.message}`, [traceId]);

      const myBentoResponse = new MyBentoResponse(null, {
        success: false,
        error: error.message,
      });

      return res.status(400).json(myBentoResponse);
    }
  }
}
