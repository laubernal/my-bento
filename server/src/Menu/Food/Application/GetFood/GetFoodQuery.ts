import { IQuery } from '@nestjs/cqrs';
import { GetFoodParams } from '../../Infrastructure/Controllers/GetFood/GetFoodParams';

export class GetFoodQuery implements IQuery {
  public static fromJson(params: GetFoodParams, traceId: string): GetFoodQuery {
    return new GetFoodQuery(params.id, traceId);
  }

  constructor(private _id: string, private _traceId: string) {}

  public get id(): string {
    return this._id;
  }

  public get traceId(): string {
    return this._traceId;
  }
}
