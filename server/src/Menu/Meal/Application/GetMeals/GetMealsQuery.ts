import { IQuery } from '@nestjs/cqrs';

export class GetMealsQuery implements IQuery {
  public static fromJson(traceId: string, searchQuery: any): GetMealsQuery {
    return new GetMealsQuery(traceId, searchQuery);
  }

  constructor(private _traceId: string, private _searchQuery: Record<string, string>) {}

  public get traceId(): string {
    return this._traceId;
  }

  public get searchQuery(): Record<string, string> {
    return this._searchQuery;
  }
}
