import { ICommand } from '@nestjs/cqrs';

export class CreateFoodCommand implements ICommand {
  public static fromJson(body: any): CreateFoodCommand {
    return new CreateFoodCommand(body.id, body.name, body.category, body.amount, body.unit);
  }

  constructor(
    private _id: string,
    private _name: string,
    private _category: string,
    private _amount: number,
    private _unit: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get category(): string {
    return this._category;
  }

  public get amount(): number {
    return this._amount;
  }

  public get unit(): string {
    return this._unit;
  }
}
