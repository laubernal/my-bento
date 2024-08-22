import { Migration } from '@mikro-orm/migrations';

export class Migration20240821140730_create_meal_table extends Migration {
  async up(): Promise<void> {
    this.addSql(`create table "meal-foods" (
      "id" uuid primary key,
      "food_id" uuid not null,
      "meal_id" uuid not null,
      "amount" integer not null,
      "unit" varchar(255) not null,
      "created_at" timestamptz not null, 
      "updated_at" timestamptz not null, 
      constraint "meal-foods_pkey" primary key ("id"),
      constraint "fk_food" foreign key ("food_id") references "foods" ("id") on delete cascade
      constraint "fk_meal" foreign key ("meal_id") references "meals" ("id") on delete cascade
      );`);

    this.addSql(`create table "meals" (
      "id" uuid primary key,
      "name" varchar(255) not null,
      "type" varchar(255) not null.
      "created_at" timestamptz not null, 
      "updated_at" timestamptz not null, 
      );`);
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "meal-foods" cascade;');
    this.addSql('drop table if exists "meals" cascade;');
  }
}
