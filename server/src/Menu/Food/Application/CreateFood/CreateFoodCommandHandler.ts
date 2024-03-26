import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFoodCommand } from './CreateFoodCommand';
import { Inject, Logger } from '@nestjs/common';
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

@CommandHandler(CreateFoodCommand)
export class CreateFoodCommandHandler implements ICommandHandler<CreateFoodCommand> {
  constructor(@Inject('IFoodRepository') private readonly repository: IFoodRepository) {}

  public async execute(command: CreateFoodCommand): Promise<any> {
    const name = new Name(command.name);
    const id = new Id(command.id);
    const category = new Category(command.category);

    const amount = new Amount(command.amount);
    const unit = new Unit(new StringVo(command.unit));
    const quantity = new Quantity(amount, unit);

    await this.ensureFoodNotExists(name);

    const food = new Food(id, name, category, quantity);

    await this.repository.save(food);
  }

  private async ensureFoodNotExists(name: Name): Promise<void> {
    const filter = FoodFilter.create().withName(name);

    const result = await this.repository.findOne(filter);

    if (typeof result !== 'undefined') {
      throw new FoodAlreadyExistsError();
    }
  }
}
