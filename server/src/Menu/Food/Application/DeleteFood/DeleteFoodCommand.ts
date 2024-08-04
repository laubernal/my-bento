import { ICommand } from '@nestjs/cqrs';
import { DeleteFoodParams } from '../../Infrastructure/Controllers/DeleteFood/DeleteFoodParams';

export class DeleteFoodCommand implements ICommand {
  public static fromJson(params: DeleteFoodParams, traceId: string): DeleteFoodCommand {
    return new DeleteFoodCommand(params.id, traceId);
  }

  constructor(private _id: string, private _traceId: string) {}

  public get id(): string {
    return this._id;
  }

  public get traceId(): string {
    return this._traceId;
  }
}
