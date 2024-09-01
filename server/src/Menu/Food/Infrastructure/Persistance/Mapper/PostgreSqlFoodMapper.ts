import { Food } from 'Menu/Food/Domain/Entity/Food';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { Category } from 'Shared/Domain/Vo/Category.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { FoodModel } from 'Shared/Infrastructure/Persistance/PostgreSql/Model/FoodModel';

export class PostgreSqlFoodMapper implements IMapper<Food, FoodModel> {
  public toModel(entity: Food): FoodModel {
    const model = {
      id: entity.id().value,
      name: entity.name().value,
      category: entity.category().value,
      created_at: entity.createdAt(),
      updated_at: entity.updatedAt(),
    };

    return model;
  }

  public toDomain(model: FoodModel): Food {
    const id = new Id(model.id);
    const name = new Name(model.name);
    const category = new Category(model.category);

    return new Food(id, name, category, model.created_at, model.updated_at);
  }
}
