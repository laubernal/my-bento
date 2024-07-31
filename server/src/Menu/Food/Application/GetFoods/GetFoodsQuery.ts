import { IQuery } from '@nestjs/cqrs';

export class GetFoodsQuery implements IQuery {
  public static fromJson(traceId: string): GetFoodsQuery {
    return new GetFoodsQuery(traceId);
  }

  constructor(private _traceId: string) {}

  public get traceId(): string {
    return this._traceId;
  }
}
