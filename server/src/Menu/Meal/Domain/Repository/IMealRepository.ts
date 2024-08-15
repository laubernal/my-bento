import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { Meal } from '../Entity/Meal';

export interface IMealRepository extends IRepository<Meal> {}
