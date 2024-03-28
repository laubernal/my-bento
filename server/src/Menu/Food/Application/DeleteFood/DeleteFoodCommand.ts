import { ICommand } from '@nestjs/cqrs';
import { DeleteFoodParams } from '../../Infrastructure/Controllers/DeleteFood/DeleteFoodParams';

export class DeleteFoodCommand implements ICommand {
  public static fromJson(params: DeleteFoodParams): DeleteFoodCommand {
    return new DeleteFoodCommand(params.id);
  }

  constructor(private _id: string) {}

  public get id(): string {
    return this._id;
  }
}
