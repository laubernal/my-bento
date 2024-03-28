import { IQuery } from '@nestjs/cqrs';
import { GetFoodParams } from '../../Infrastructure/Controllers/GetFood/GetFoodParams';

export class GetFoodQuery implements IQuery {
  public static fromJson(params: GetFoodParams): GetFoodQuery {
    return new GetFoodQuery(params.id);
  }

  constructor(private _id: string) {}

  public get id(): string {
    return this._id;
  }
}
