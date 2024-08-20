import { Collection, Entity, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { MealFoodEntity } from './MealFoodEntityMikroOrm';

@Entity({ tableName: 'meals' })
export class MealEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property()
  name!: string;

  @Property()
  type!: string;

  @ManyToMany(() => MealFoodEntity)
  foods: Collection<MealFoodEntity> = new Collection<MealFoodEntity>(this);

  @Property()
  created_at!: Date;

  @Property()
  updated_at!: Date;
}
