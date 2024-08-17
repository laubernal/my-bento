import { ICommandHandler } from '@nestjs/cqrs';
import { CreateMealCommand } from './CreateMealCommand';
import { Inject } from '@nestjs/common';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { IMEAL_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { MealAlreadyExistsError } from 'Menu/Meal/Domain/Error/MealAlreadyExists';
import { MealType } from 'Shared/Domain/Vo/MealType';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { Food } from 'Menu/Meal/Domain/Entity/Food';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';
import { Amount } from 'Shared/Domain/Vo/Amount.vo';
import { MealFoodType } from 'Menu/Shared/Domain/types';

export class CreateMealCommandHandler implements ICommandHandler {
  constructor(
    @Inject(IMEAL_REPOSITORY) private readonly mealRepository: IMealRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  public async execute(command: CreateMealCommand): Promise<any> {
    const id = new Id(command.id);
    const name = new Name(command.name);
    const type = new MealType(new StringVo(command.type));

    await this.ensureMealNotExists(name);

    const foods: Food[] = command.foods.map((food: MealFoodType) => {
      return new Food(
        new Id(food.id),
        new Id(food.foodId),
        new Quantity(new Amount(food.amount), new Unit(new StringVo(food.unit)))
      );
    });

    const meal = new Meal(id, name, type, foods);

    await this.mealRepository.save(meal);
  }

  private async ensureMealNotExists(name: Name): Promise<void> {
    const filter = MealFilter.create().withName(name);

    const result = await this.mealRepository.findOne(filter);

    if (typeof result !== 'undefined') {
      throw new MealAlreadyExistsError();
    }
  }
}
