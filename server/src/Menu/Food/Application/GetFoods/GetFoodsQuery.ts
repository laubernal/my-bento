import { IQuery } from '@nestjs/cqrs';

export class GetFoodsQuery implements IQuery {
  public static fromJson(): GetFoodsQuery {
    return new GetFoodsQuery();
  }

  constructor() {}
}
