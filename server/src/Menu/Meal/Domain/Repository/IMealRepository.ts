import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { Meal } from '../Entity/Meal';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import {MealFilter} from "Menu/Meal/Domain/Filter/MealFilter";

export interface IMealRepository extends IRepository<Meal> {
  deleteMealFood(id: Id): Promise<void>;
  count(filter: MealFilter): Promise<number>
}
