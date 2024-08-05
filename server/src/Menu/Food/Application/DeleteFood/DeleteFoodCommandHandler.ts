import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFoodRepository } from '../../Domain/Repository/IFoodRepository';
import { FoodFilter } from '../../Domain/Filter/FoodFilter';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Food } from '../../Domain/Entity/Food';
import { DeleteFoodCommand } from './DeleteFoodCommand';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MY_BENTO_LOGGER } from 'Shared/Domain/constants';

@CommandHandler(DeleteFoodCommand)
export class DeleteFoodCommandHandler implements ICommandHandler<DeleteFoodCommand> {
  constructor(
    @Inject('IFoodRepository') private readonly repository: IFoodRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  public async execute(command: DeleteFoodCommand): Promise<any> {
    const id = new Id(command.id);

    const food = await this.findFood(id, command.traceId);

    await this.repository.delete(food);
  }

  private async findFood(id: Id, traceId: string): Promise<Food> {
    const filter = FoodFilter.create().withId(id);

    this.logger.log('Before querying DB to delete food', [traceId]);

    const result = await this.repository.findOne(filter);

    this.logger.log('After querying DB to delete food', [traceId]);

    if (typeof result === 'undefined') {
      throw new RecordNotFoundError();
    }

    return result;
  }
}
