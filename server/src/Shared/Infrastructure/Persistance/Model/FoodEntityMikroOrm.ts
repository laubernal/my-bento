import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'foods' })
export class FoodEntity {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property()
  name!: string;

  @Property()
  category!: string;

  @Property()
  amount!: number;

  @Property()
  unit!: string;

  @Property()
  created_at!: Date;

  @Property()
  updated_at!: Date;
}
