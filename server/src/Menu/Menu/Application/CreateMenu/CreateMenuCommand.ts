import { ICommand } from '@nestjs/cqrs';
import { MenuMealType } from 'Menu/Shared/Domain/types';

export class CreateMenuCommand implements ICommand {
  public static fromJson(
    body: { id: string; meals: { id: string; date: Date; meal: string }[] },
    traceId: string
  ): CreateMenuCommand {
    return new CreateMenuCommand(body.id, body.meals, traceId);
  }
  constructor(private _id: string, private _meals: MenuMealType[], private _traceId: string) {}

  public get id(): string {
    return this._id;
  }

  public get meals(): MenuMealType[] {
    return this._meals;
  }

  public get traceId(): string {
    return this._traceId;
  }
}
