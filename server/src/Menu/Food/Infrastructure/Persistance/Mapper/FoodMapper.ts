import { Food } from 'Menu/Food/Domain/Entity/Food';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { Category } from 'Shared/Domain/Vo/Category.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { FoodEntity } from 'Shared/Infrastructure/Persistance/Model/FoodEntityMikroOrm';

export class FoodMapper implements IMapper<Food, FoodEntity> {
  public toModel(entity: Food): FoodEntity {
    const model = new FoodEntity();

    model.id = entity.id().value;
    model.name = entity.name().value;
    model.category = entity.category().value;
    model.created_at = entity.createdAt();
    model.updated_at = entity.updatedAt();

    return model;
  }

  public toDomain(model: FoodEntity): Food {
    const id = new Id(model.id);
    const name = new Name(model.name);
    const category = new Category(model.category);

    return new Food(id, name, category, model.created_at, model.updated_at);
  }
}
