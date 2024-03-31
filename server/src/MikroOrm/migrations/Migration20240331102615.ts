import { Migration } from '@mikro-orm/migrations';

export class Migration20240331102615 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "foods" (
      "id" uuid not null, 
      "name" varchar(255) not null, 
      "category" varchar(255) not null, 
      "amount" int not null, 
      "unit" varchar(255) not null, 
      "created_at" timestamptz not null, 
      "updated_at" timestamptz not null, 
      constraint "foods_pkey" primary key ("id")
      );`
    );
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists 'foods';`);
  }
}
