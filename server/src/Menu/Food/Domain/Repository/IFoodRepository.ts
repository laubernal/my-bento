import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { Food } from '../Entity/Food';

export interface IFoodRepository extends IRepository<Food> {}
