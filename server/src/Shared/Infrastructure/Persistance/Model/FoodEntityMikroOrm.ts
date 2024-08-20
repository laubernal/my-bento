import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { MealFoodEntity } from './MealFoodEntityMikroOrm';

@Entity({ tableName: 'foods' })
export class FoodEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property()
  name!: string;

  @Property()
  category!: string;

  @OneToMany({ entity: () => MealFoodEntity, mappedBy: 'food' })
  meal_foods: Collection<MealFoodEntity> = new Collection<MealFoodEntity>(this);

  @Property()
  created_at!: Date;

  @Property()
  updated_at!: Date;
}
