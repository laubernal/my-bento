import { ICommand } from '@nestjs/cqrs';
import { CreateMealApiRequest } from 'Menu/Meal/Infrastructure/Controllers/CreateMeal/CreateMealApiRequest';
import { MealFoodType } from 'Menu/Shared/Domain/types';

export class CreateMealCommand implements ICommand {
  public static fromJson(body: CreateMealApiRequest, traceId: string): CreateMealCommand {
    return new CreateMealCommand(body.id, body.name, body.type, body.foods, traceId);
  }

  constructor(
    private _id: string,
    private _name: string,
    private _type: string,
    private _foods: MealFoodType[],
    private _traceId: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): string {
    return this._type;
  }

  public get foods(): MealFoodType[] {
    return this._foods;
  }

  public get traceId(): string {
    return this._traceId;
  }
}
