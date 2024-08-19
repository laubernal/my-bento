import { Controller, Delete, Headers, Inject, Param, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { MyBentoResponse } from 'Shared/Domain/MyBentoResponse';
import { DeleteMealParams } from './DeleteMealParams';
import { DeleteMealCommand } from 'Menu/Meal/Application/DeleteMeal/DeleteMealCommand';

@Controller()
export class DeleteMealController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  @Delete('api/meals/:id')
  public async post(
    @Param() params: DeleteMealParams,
    @Headers('traceId') traceId: string,
    @Res() res: Response
  ) {
    try {
      this.logger.log('Starting to delete meal', [traceId]);

      const command = DeleteMealCommand.fromJson(params, traceId);

      await this.commandBus.execute(command);

      const myBentoResponse = new MyBentoResponse<null>(null, {
        success: true,
        error: null,
      });

      return res.status(200).json(myBentoResponse);
    } catch (error: any) {
      this.logger.error(`Error deleting meal: ${error.message}`, [traceId]);

      const myBentoResponse = new MyBentoResponse<null>(null, {
        success: false,
        error: error.message,
      });

      return res.status(400).json(myBentoResponse);
    }
  }
}
