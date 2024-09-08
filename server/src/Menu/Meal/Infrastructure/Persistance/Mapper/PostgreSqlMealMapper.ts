import { Food } from 'Menu/Meal/Domain/Entity/Food';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { MealType } from 'Shared/Domain/Vo/MealType';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { StringVo } from 'Shared/Domain/Vo/String.vo';
import { MealModel } from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MealModel';

export class PostgreSqlMealMapper implements IMapper<Meal, MealModel> {
  public toModel(entity: Meal): MealModel {
    const foods = entity.foods().map((food: Food) => {
      return food.id().value;
    });

    const model = {
      id: entity.id().value,
      name: entity.name().value,
      type: entity.type().value,
      //   foods,
      foods: [],
      created_at: entity.createdAt(),
      updated_at: entity.updatedAt(),
    };

    return model;
  }

  public toDomain(model: MealModel): Meal {
    // console.log('MODEL', model);
    const id = new Id(model.id);
    const name = new Name(model.name);
    const type = new MealType(new StringVo(model.type));

    new Meal(id, name, type, [], model.created_at, model.updated_at);

    throw new Error('Method not implemented');
  }
}
