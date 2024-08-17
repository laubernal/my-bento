import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFoodCommand } from './CreateFoodCommand';
import { Inject } from '@nestjs/common';
import { IFoodRepository } from '../../Domain/Repository/IFoodRepository';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { FoodFilter } from '../../Domain/Filter/FoodFilter';
import { FoodAlreadyExistsError } from '../../Domain/Error/FoodAlreadyExists';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Category } from 'Shared/Domain/Vo/Category.vo';
import { Food } from '../../Domain/Entity/Food';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';

@CommandHandler(CreateFoodCommand)
export class CreateFoodCommandHandler implements ICommandHandler<CreateFoodCommand> {
  constructor(
    @Inject(IFOOD_REPOSITORY) private readonly repository: IFoodRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  public async execute(command: CreateFoodCommand): Promise<any> {
    const name = new Name(command.name);
    const id = new Id(command.id);
    const category = new Category(command.category);


    await this.ensureFoodNotExists(name, command.traceId);

    const food = new Food(id, name, category, 
      // quantity
    );

    await this.repository.save(food);
  }

  private async ensureFoodNotExists(name: Name, traceId: string): Promise<void> {
    const filter = FoodFilter.create().withName(name);

    this.logger.log('Before querying DB to create food', [traceId]);

    const result = await this.repository.findOne(filter);

    this.logger.log('After querying DB to create food', [traceId]);

    if (typeof result !== 'undefined') {
      throw new FoodAlreadyExistsError();
    }
  }
}
