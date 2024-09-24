import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMenuCommand } from './CreateMenuCommand';
import { IMenuRepository } from 'Menu/Menu/Domain/Repository/IMenuRepository';
import { Inject } from '@nestjs/common';
import { Menu } from 'Menu/Menu/Domain/Entity/Menu';
import { MenuMealType } from 'Menu/Shared/Domain/types';
import { Meal } from 'Menu/Menu/Domain/Entity/Meal';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { IMENU_REPOSITORY } from 'Shared/Domain/InterfacesConstants';

@CommandHandler(CreateMenuCommand)
export class CreateMenuCommandHandler implements ICommandHandler {
  constructor(@Inject(IMENU_REPOSITORY) private repository: IMenuRepository) {}

  public async execute(command: CreateMenuCommand): Promise<void> {
    const menu = this.buildMenu(command);

    await this.repository.save(menu);
  }

  private buildMenu(command: CreateMenuCommand): Menu {
    const meals = command.meals.map((meal: MenuMealType) => {
      return new Meal(new Id(meal.id), meal.date, new Id(meal.meal));
    });

    return new Menu(new Id(command.id), meals, new Date(), new Date());
  }
}
