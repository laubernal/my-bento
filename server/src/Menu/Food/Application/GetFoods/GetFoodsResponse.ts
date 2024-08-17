import { Food } from '../../Domain/Entity/Food';

export class GetFoodsResponse {
  public static toResponse(food: Food): GetFoodsResponse {
    return new GetFoodsResponse(
      food.id().value,
      food.name().value,
      food.category().value,
    );
  }

  constructor(
    readonly id: string,
    readonly name: string,
    readonly category: string,
  ) {}
}
