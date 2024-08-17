import { ICommand } from '@nestjs/cqrs';

export class DeleteMealCommand implements ICommand {
  public static fromJson(params: any, traceId: string): DeleteMealCommand {
    return new DeleteMealCommand(params.id, traceId);
  }
  constructor(private _id: string, private _traceId: string) {}

  public get id(): string {
    return this._id;
  }

  public get traceId(): string {
    return this._traceId;
  }
}
