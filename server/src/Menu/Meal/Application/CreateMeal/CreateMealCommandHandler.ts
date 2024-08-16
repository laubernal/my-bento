import { ICommandHandler } from '@nestjs/cqrs';
import { CreateMealCommand } from './CreateMealCommand';
import { Inject } from '@nestjs/common';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { MealAlreadyExistsError } from 'Menu/Meal/Domain/Error/MealAlreadyExists';
import { MealType } from 'Shared/Domain/Vo/MealType';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { Food } from 'Menu/Food/Domain/Entity/Food';
import { IFoodRepository } from 'Menu/Food/Domain/Repository/IFoodRepository';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';

export class CreateMealCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IMealRepository') private readonly mealRepository: IMealRepository,
    @Inject(IFOOD_REPOSITORY) private readonly foodRepository: IFoodRepository,
    @Inject(MY_BENTO_LOGGER) private readonly logger: IMyBentoLogger
  ) {}

  public async execute(command: CreateMealCommand): Promise<any> {
    const id = new Id(command.id);
    const name = new Name(command.name);
    const type = new MealType(new StringVo(command.type));

    await this.ensureMealNotExists(name);

    const foods: Food[] = [];

    for (const food of command.foods) {
      const foundFood = await this.findFood(new Id(food));

      foods.push(foundFood);
    }

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

  private async findFood(id: Id): Promise<Food> {
    const filter = FoodFilter.create().withId(id);

    const result = await this.foodRepository.findOne(filter);

    if (typeof result == 'undefined') {
      throw new RecordNotFoundError();
    }

    return result;
  }
}
