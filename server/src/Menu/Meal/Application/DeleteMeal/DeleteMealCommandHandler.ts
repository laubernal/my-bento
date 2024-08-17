import { ICommandHandler } from '@nestjs/cqrs';
import { DeleteMealCommand } from './DeleteMealCommand';
import { Inject } from '@nestjs/common';
import { IMEAL_REPOSITORY } from 'Shared/Domain/InterfacesConstants';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';

export class DeleteMealCommandHandler implements ICommandHandler {
  constructor(@Inject(IMEAL_REPOSITORY) private readonly repository: IMealRepository) {}

  public async execute(command: DeleteMealCommand): Promise<any> {
    const id = new Id(command.id);

    const meal = await this.findMeal(id);

    await this.repository.delete(meal);
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
