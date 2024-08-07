import { ICommand } from '@nestjs/cqrs';
import { CreateFoodApiRequest } from '../../Infrastructure/Controllers/CreateFood/CreateFoodApiRequest';

export class CreateFoodCommand implements ICommand {
  public static fromJson(body: CreateFoodApiRequest, traceId: string): CreateFoodCommand {
    return new CreateFoodCommand(
      body.id,
      body.name,
      body.category,
      body.amount,
      body.unit,
      traceId
    );
  }

  constructor(
    private _id: string,
    private _name: string,
    private _category: string,
    private _amount: number,
    private _unit: string,
    private _traceId: string
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

  public get traceId(): string {
    return this._traceId;
  }
}
