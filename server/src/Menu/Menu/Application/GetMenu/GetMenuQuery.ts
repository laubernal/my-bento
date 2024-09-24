import { IQuery } from '@nestjs/cqrs';

export class GetMenuQuery implements IQuery {
  constructor(private _id: string, private _traceId: string) {}

  public get id(): string {
    return this._id;
  }

  public get traceId(): string {
    return this._traceId;
  }
}
