import { IQuery } from '@nestjs/cqrs';

export class GetFoodQuery implements IQuery {
  public static fromJson(params: any): GetFoodQuery {
    return new GetFoodQuery(params.id);
  }

  constructor(private _id: string) {}

  public get id(): string {
    return this._id;
  }
}
