import { Body, Controller, Headers, Inject, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { MyBentoResponse } from 'Shared/Domain/MyBentoResponse';
import { CreateMealCommand } from 'Menu/Meal/Application/CreateMeal/CreateMealCommand';
import { CreateMealApiRequest } from './CreateMealApiRequest';

@Controller()
export class CreateMealController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  @Post('/api/meals')
  public async post(
    @Headers('traceId') traceId: string,
    @Body() body: CreateMealApiRequest,
    @Res() res: Response
  ) {
    try {
      this.logger.log('Starting to create meal', [traceId]);

      const command = CreateMealCommand.fromJson(body, traceId);

      await this.commandBus.execute(command);

      const response = new MyBentoResponse(null, {
        success: true,
        error: null,
      });

      return res.status(200).json(response);
    } catch (error: any) {
      this.logger.error(`Error creating meal: ${error.message}`, [traceId]);

      const errorResponse = new MyBentoResponse(null, {
        success: false,
        error: error.message,
      });

      return res.status(400).json(errorResponse);
    }
  }
}
