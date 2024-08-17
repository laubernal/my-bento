import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateMealCommand } from './UpdateMealCommand';
import { Inject } from '@nestjs/common';
import { IMEAL_REPOSITORY } from 'Shared/Domain/InterfacesConstants';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { MealType } from 'Shared/Domain/Vo/MealType';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { Food } from 'Menu/Meal/Domain/Entity/Food';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';
import { Amount } from 'Shared/Domain/Vo/Amount.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { MealFoodType } from 'Menu/Shared/Domain/types';

export class UpdateMealCommandHandler implements ICommandHandler {
  constructor(@Inject(IMEAL_REPOSITORY) private readonly repository: IMealRepository) {}

  public async execute(command: UpdateMealCommand): Promise<any> {
    const id = new Id(command.id);
    const name = new Name(command.name);
    const type = new MealType(new StringVo(command.type));

    const oldMeal = await this.findMeal(id);

    const foods: Food[] = command.foods.map((food: MealFoodType) => {
      return new Food(
        new Id(food.id),
        new Id(food.foodId),
        new Quantity(new Amount(food.amount), new Unit(new StringVo(food.unit)))
      );
    });

    const newMeal = new Meal(id, name, type, foods, oldMeal.createdAt(), new Date());

    await this.repository.update(newMeal);
  }

  private async findMeal(id: Id): Promise<Meal> {
    const filter = MealFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    if (typeof result === 'undefined') {
      throw new RecordNotFoundError();
    }

    return result;
  }
}
