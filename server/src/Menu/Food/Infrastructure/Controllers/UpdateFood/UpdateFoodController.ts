import { Body, Controller, Headers, Inject, Param, Put, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { UpdateFoodCommand } from 'src/Menu/Food/Application/UpdateFood/UpdateFoodCommand';
import { UpdateFoodParams } from './UpdateFoodParams';
import { UpdateFoodApiRequest } from './UpdateFoodApiRequest';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { MyBentoResponse } from 'Shared/Domain/MyBentoResponse';

@Controller()
export class UpdateFoodController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

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

      const myBentoResponse = new MyBentoResponse<null>(null, {
        success: true,
        error: null,
      });

      return res.status(200).json(myBentoResponse);
    } catch (error: any) {
      this.logger.error(`Error updating food: ${error.message}`, [traceId]);

      const myBentoResponse = new MyBentoResponse<null>(null, {
        success: false,
        error: error.message,
      });

      return res.status(400).json(myBentoResponse);
    }
  }
}
