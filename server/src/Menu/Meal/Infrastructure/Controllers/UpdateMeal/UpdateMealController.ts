import { Body, Controller, Headers, Inject, Param, Put, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { MyBentoResponse } from 'Shared/Domain/MyBentoResponse';
import { UpdateMealParams } from './UpdateMealParams';
import { UpdateMealApiRequest } from './UpdateMealApiRequest';
import { UpdateMealCommand } from 'Menu/Meal/Application/UpdateMeal/UpdateMealCommand';

@Controller()
export class UpdateMealController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  @Put('api/meals/:id')
  public async post(
    @Param() params: UpdateMealParams,
    @Headers('traceId') traceId: string,
    @Body() body: UpdateMealApiRequest,
    @Res() res: Response
  ) {
    try {
      this.logger.log('Starting to update meal', [traceId]);

      const command = UpdateMealCommand.fromJson(params, body, traceId);

      await this.commandBus.execute(command);

      const myBentoResponse = new MyBentoResponse<null>(null, {
        success: true,
        error: null,
      });

      return res.status(200).json(myBentoResponse);
    } catch (error: any) {
      this.logger.error(`Error updating meal: ${error.message}`, [traceId]);

      const myBentoResponse = new MyBentoResponse<null>(null, {
        success: false,
        error: error.message,
      });

      return res.status(400).json(myBentoResponse);
    }
  }
}
