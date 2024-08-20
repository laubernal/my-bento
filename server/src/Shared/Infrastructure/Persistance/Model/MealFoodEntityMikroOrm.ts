import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { FoodEntity } from './FoodEntityMikroOrm';

@Entity({ tableName: 'meal-foods' })
export class MealFoodEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @ManyToOne({ entity: () => FoodEntity })
  food!: FoodEntity;

  @Property()
  amount!: number;

  @Property()
  unit!: string;

  @Property()
  created_at!: Date;

  @Property()
  updated_at!: Date;
}
