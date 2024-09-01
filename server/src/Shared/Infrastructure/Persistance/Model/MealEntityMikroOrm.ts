import { Entity, ManyToMany, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
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
  foods: FoodEntity[] = [];

  // @OneToMany(() => MealFoodEntity, mealFood => mealFood.meal, { persist: false, cascade: [] })
  // mealFoods: MealFoodEntity[] = [];

  @Property()
  created_at!: Date;

  @Property()
  updated_at!: Date;
}
