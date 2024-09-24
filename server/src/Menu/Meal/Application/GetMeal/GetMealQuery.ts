import { IQuery } from '@nestjs/cqrs';

export class GetMealQuery implements IQuery {
  public static fromJson(params: any, traceId: string): GetMealQuery {
    return new GetMealQuery(params.id, traceId);
  }

  constructor(private _id: string, private _traceId: string) {}

  public get id(): string {
    return this._id;
  }

  public get traceId(): string {
    return this._traceId;
  }
}
