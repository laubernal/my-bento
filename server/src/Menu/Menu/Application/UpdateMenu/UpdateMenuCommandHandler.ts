import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {IMENU_REPOSITORY} from 'Shared/Domain/InterfacesConstants';
import {IMenuRepository} from 'Menu/Menu/Domain/Repository/IMenuRepository';
import {UpdateMenuCommand} from 'Menu/Menu/Application/UpdateMenu/UpdateMenuCommand';
import {Id} from 'Shared/Domain/Vo/Id.vo';
import {Meal} from 'Menu/Menu/Domain/Entity/Meal';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';
import {MenuFilter} from 'Menu/Menu/Domain/Filter/MenuFilter';
import {RecordNotFoundError} from 'Shared/Domain/Error/RecordNotFoundError';
import {MenuMealType} from 'Menu/Shared/Domain/types';
import {MissingMealsInMenuError} from 'Menu/Menu/Domain/Error/MissingMealsInMenuError';
import {WrongNumberOfMealsInMenuError} from 'Menu/Menu/Domain/Error/WrongNumberOfMealsInMenuError';
import {
    MealsInMenuDoNotBelongToSameWeekRangeError
} from 'Menu/Menu/Domain/Error/MealsInMenuDoNotBelongToSameWeekRangeError';

@CommandHandler(UpdateMenuCommand)
export class UpdateMenuCommandHandler implements ICommandHandler<UpdateMenuCommand> {
    constructor(@Inject(IMENU_REPOSITORY) private readonly repository: IMenuRepository) {
    }

    public async execute(command: UpdateMenuCommand): Promise<void> {
        this.ensureMenuHasCorrectData(command);

        const id = new Id(command.id);
        const oldMenu = await this.findMenu(id);

        const menuMeals: Meal[] = command.meals.map((meal: MenuMealType) => {
            return new Meal(new Id(meal.id), new Date(meal.date), new Id(meal.mealId));
        });

        const updatedMenu = new Menu(id, menuMeals, oldMenu.createdAt(), new Date());

        await this.repository.update(updatedMenu);
    }

    private async findMenu(id: Id): Promise<Menu> {
        const filter = MenuFilter.create().withId(id);
        const result = await this.repository.findOne(filter);

        if (typeof result === 'undefined') {
            throw new RecordNotFoundError();
        }

        return result;
    }

    private ensureMenuHasCorrectData(command: UpdateMenuCommand): void {
        if (!command.meals.length) {
            throw new MissingMealsInMenuError();
        }

        const sortedMeals: MenuMealType[] = command.meals.sort((a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime());

        const mealsGroupedByDays = sortedMeals
            .reduce<Record<string, MenuMealType[]>>((groupedMeals, meal) => {
                const mealDateKey = new Date(meal.date).toISOString().split('T')[0];

                if (!groupedMeals[mealDateKey]) {
                    groupedMeals[mealDateKey] = [];
                }

                groupedMeals[mealDateKey].push(meal);

                return groupedMeals;
            }, {});

        if (Object.keys(mealsGroupedByDays).length === 1) {
            return;
        }

        const WEEK_DAYS_NUMBER = 7;

        if (Object.keys(mealsGroupedByDays).length > WEEK_DAYS_NUMBER) {
            throw new WrongNumberOfMealsInMenuError();
        }

        if (!this.mealsWithinSameWeek(sortedMeals)) {
            throw new MealsInMenuDoNotBelongToSameWeekRangeError();
        }
    }

    private mealsWithinSameWeek(sortedMeals: MenuMealType[]): boolean {
        const firstDate = new Date(sortedMeals[0].date);
        const lastDate = new Date(sortedMeals[sortedMeals.length - 1].date);

        const {start, end} = this.getWeekRange(firstDate);

        return lastDate.getTime() <= end.getTime();
    }

    private getWeekRange(firstDate: Date): { start: Date; end: Date } {
        const mealDate = new Date(firstDate);
        const day = mealDate.getDay();
        const diffToMonday = (day + 6) % 7;

        const start = new Date(mealDate);
        start.setDate(mealDate.getDate() - diffToMonday);
        start.setHours(0, 0, 0, 0);

        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);

        return {start, end};
    }
}
