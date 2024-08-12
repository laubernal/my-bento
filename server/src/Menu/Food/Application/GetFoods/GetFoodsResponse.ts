import { Food } from '../../Domain/Entity/Food';

export class GetFoodsResponse {
  public static toResponse(food: Food): GetFoodsResponse {
    return new GetFoodsResponse(
      food.id().value,
      food.name().value,
      food.category().value,
      food.quantity().amount().value,
      food.quantity().unit().value
    );
  }

  constructor(
    readonly id: string,
    readonly name: string,
    readonly category: string,
    readonly amount: number,
    readonly unit: string
  ) {}
}
