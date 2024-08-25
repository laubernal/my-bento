import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { MealFoodEntity } from './MealFoodEntityMikroOrm';
import { FoodEntity } from './FoodEntityMikroOrm';

@Entity({ tableName: 'meals' })
export class MealEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property()
  name!: string;

  @Property()
  type!: string;

  @ManyToMany({
    entity: () => FoodEntity,
    pivotEntity: () => MealFoodEntity,
    cascade: [],
  })
  foods: Collection<FoodEntity> = new Collection<FoodEntity>(this);

  @OneToMany(() => MealFoodEntity, mealFood => mealFood.meal)
  mealFoods = new Collection<MealFoodEntity>(this);

  @Property()
  created_at!: Date;

  @Property()
  updated_at!: Date;
}
