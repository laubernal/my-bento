import { ICommand } from '@nestjs/cqrs';
import { MealFoodType } from 'Menu/Shared/Domain/types';

export class UpdateMealCommand implements ICommand {
  public static fromJson(body: any, traceId: string): UpdateMealCommand {
    return new UpdateMealCommand(body.id, body.name, body.type, body.foods, traceId);
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