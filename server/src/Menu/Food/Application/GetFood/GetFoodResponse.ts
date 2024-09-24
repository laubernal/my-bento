import { Food } from '../../Domain/Entity/Food';

export class GetFoodResponse {
  public static toResponse(food: Food): GetFoodResponse {
    return new GetFoodResponse(
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
