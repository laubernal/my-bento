import { Body, Controller, Headers, Inject, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { CreateFoodCommand } from 'src/Menu/Food/Application/CreateFood/CreateFoodCommand';
import { CreateFoodApiRequest } from './CreateFoodApiRequest';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';

@Controller()
export class CreateFoodController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  @Post('/api/foods')
  public async post(
    @Headers('traceId') traceId: string,
    @Body() body: CreateFoodApiRequest,
    @Res() res: Response
  ) {
    try {
      this.logger.log('Starting to create food', [traceId]);

      const command = CreateFoodCommand.fromJson(body, traceId);

      await this.commandBus.execute(command);

      return res.status(200).json({});
    } catch (error: any) {
      this.logger.error(`Error creating food: ${error.message}`, [traceId]);

      return res.status(400).json({ error: error.message });
    }
  }
}
