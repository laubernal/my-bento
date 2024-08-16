import { IQuery } from '@nestjs/cqrs';

export class GetMealsQuery implements IQuery {
  public static fromJson(traceId: string): GetMealsQuery {
    return new GetMealsQuery(traceId);
  }

  constructor(private _traceId: string) {}

  public get traceId(): string {
    return this._traceId;
  }
}
