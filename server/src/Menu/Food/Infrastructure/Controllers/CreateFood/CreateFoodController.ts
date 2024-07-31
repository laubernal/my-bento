import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { CreateFoodCommand } from 'src/Menu/Food/Application/CreateFood/CreateFoodCommand';
import { CreateFoodApiRequest } from './CreateFoodApiRequest';
import { MyBentoLogger } from 'Shared/Infrastructure/Logger/MyBentoLogger';

@Controller()
export class CreateFoodController {
  constructor(private readonly commandBus: CommandBus, private readonly logger: MyBentoLogger) {}

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
