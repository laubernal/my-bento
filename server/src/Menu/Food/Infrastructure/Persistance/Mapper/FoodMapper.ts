import { Food } from 'Menu/Food/Domain/Entity/Food';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { Amount } from 'Shared/Domain/Vo/Amount.vo';
import { Category } from 'Shared/Domain/Vo/Category.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Quantity } from 'Shared/Domain/Vo/Quantity.vo';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';
import { FoodEntity } from 'Shared/Infrastructure/Persistance/Model/FoodEntityMikroOrm';

export class FoodMapper implements IMapper<Food, FoodEntity> {
  public toModel(entity: Food): FoodEntity {
    const model = new FoodEntity();

    model.id = entity.id().value;
    model.name = entity.name().value;
    model.category = entity.category().value;
    model.amount = entity.quantity().amount().value;
    model.unit = entity.quantity().unit().value();
    model.created_at = entity.createdAt();
    model.updated_at = entity.updatedAt();

    return model;
  }

  public toDomain(model: FoodEntity): Food {
    const id = new Id(model.id);
    const name = new Name(model.name);
    const category = new Category(model.category);

    const amount = new Amount(model.amount);
    const unit = new Unit(new StringVo(model.unit));
    const quantity = new Quantity(amount, unit);

    return new Food(id, name, category, quantity, model.created_at, model.updated_at);
  }
}
