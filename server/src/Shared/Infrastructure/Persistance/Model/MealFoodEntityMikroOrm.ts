import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { FoodEntity } from './FoodEntityMikroOrm';
import { MealEntity } from './MealEntityMikroOrm';

@Entity({ tableName: 'meal_foods' })
export class MealFoodEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @ManyToOne({ entity: () => FoodEntity })
  food!: FoodEntity;

  @ManyToOne({ entity: () => MealEntity })
  meal!: MealEntity;

  @Property()
  amount!: number;

  @Property()
  unit!: string;

  @Property()
  created_at!: Date;

  @Property()
  updated_at!: Date;
}
