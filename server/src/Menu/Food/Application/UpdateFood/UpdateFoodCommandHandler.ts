import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { IFoodRepository } from '../../Domain/Repository/IFoodRepository';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { FoodFilter } from '../../Domain/Filter/FoodFilter';
import { FoodAlreadyExistsError } from '../../Domain/Error/FoodAlreadyExists';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Category } from 'Shared/Domain/Vo/Category.vo';
import { Amount } from 'Shared/Domain/Vo/Amount.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { Food } from '../../Domain/Entity/Food';
import { UpdateFoodCommand } from './UpdateFoodCommand';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { MyBentoLogger } from 'Shared/Infrastructure/Logger/MyBentoLogger';

@CommandHandler(UpdateFoodCommand)
export class UpdateFoodCommandHandler implements ICommandHandler<UpdateFoodCommand> {
  constructor(
    @Inject('IFoodRepository') private readonly repository: IFoodRepository,
    private readonly logger: MyBentoLogger
  ) {}

  public async execute(command: UpdateFoodCommand): Promise<any> {
    const name = new Name(command.name);
    const id = new Id(command.id);
    const category = new Category(command.category);

    const amount = new Amount(command.amount);
    const unit = new Unit(new StringVo(command.unit));
    const quantity = new Quantity(amount, unit);

    const oldFood = await this.findFood(id, command.traceId);

    const food = new Food(id, name, category, quantity, oldFood.createdAt(), new Date());

    await this.repository.update(food);
  }

  private async findFood(id: Id, traceId: string): Promise<Food> {
    const filter = FoodFilter.create().withId(id);

    this.logger.log('Before querying DB to update food', [traceId]);

    const result = await this.repository.findOne(filter);

    this.logger.log('After querying DB to update food', [traceId]);

    if (typeof result === 'undefined') {
      throw new RecordNotFoundError();
    }

    return result;
  }
}
