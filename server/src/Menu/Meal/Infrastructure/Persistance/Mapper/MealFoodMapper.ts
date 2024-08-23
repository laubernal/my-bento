import { Food } from 'Menu/Meal/Domain/Entity/Food';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { Amount } from 'Shared/Domain/Vo/Amount.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';
import { FoodEntity } from 'Shared/Infrastructure/Persistance/Model/FoodEntityMikroOrm';
import { MealFoodEntity } from 'Shared/Infrastructure/Persistance/Model/MealFoodEntityMikroOrm';

export class MealFoodMapper implements IMapper<Food, MealFoodEntity> {
  public toModel(entity: Food): MealFoodEntity {
    const model = new MealFoodEntity();
    const foodModel = new FoodEntity();

    foodModel.id = entity.foodId().value;

    model.id = entity.id().value;
    model.food = foodModel;
    model.amount = entity.quantity().amount().value;
    model.unit = entity.quantity().unit().value;
    model.created_at = entity.createdAt();
    model.updated_at = entity.updatedAt();

    return model;
  }

  public toDomain(model: MealFoodEntity): Food {
    const id = new Id(model.id);
    const foodId = new Id(model.food.id);
    const quantity = new Quantity(new Amount(model.amount), new Unit(new StringVo(model.unit)));

    return new Food(id, foodId, quantity, model.created_at, model.updated_at);
  }
}
