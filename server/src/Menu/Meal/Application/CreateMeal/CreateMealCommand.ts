import { ICommand } from '@nestjs/cqrs';

export class CreateMealCommand implements ICommand {
  public static fromJson(body: any, traceId: string): CreateMealCommand {
    return new CreateMealCommand(body.id, body.name, body.type, body.foods, traceId);
  }

  constructor(
    private _id: string,
    private _name: string,
    private _type: string,
    private _foods: string[],
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

  public get foods(): string[] {
    return this._foods;
  }

  public get traceId(): string {
    return this._traceId;
  }
}
