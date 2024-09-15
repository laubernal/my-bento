import { Injectable } from '@nestjs/common';
import { PostgreSqlDatabaseService } from 'Shared/Infrastructure/Persistance/PostgreSql/PostgreSqlDatabase';
import { PostgreSqlMealMapper } from '../Mapper/PostgreSqlMealMapper';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { PostgreSqlMealFilterAdapter } from '../Filter/PostgreSqlMealFilterAdapter';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { MealModel } from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MealModel';
import { Id } from 'Shared/Domain/Vo/Id.vo';

@Injectable()
export class PostgreSqlMealRepository implements IMealRepository {
  constructor(
    private readonly mapper: PostgreSqlMealMapper,
    private readonly databaseService: PostgreSqlDatabaseService
  ) {}

  public async findOne(filter: MealFilter): Promise<Meal | undefined> {
    try {
      const adapter = new PostgreSqlMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const query = `SELECT 
      meals.id,
      meals.name,
      meals.type,
      meals.created_at,
      meals.updated_at,
      meal_foods.id AS mealFood_id,
      meal_foods.meal_id AS mealFood_meal,
      meal_foods.food_id AS mealFood_food,
      meal_foods.amount AS mealFood_amount,
      meal_foods.unit AS mealFood_unit,
      meal_foods.created_at AS mealFood_created_at,
      meal_foods.updated_at AS mealFood_updated_at
      FROM meals      
      LEFT JOIN meal_foods
      ON meals.id = meal_foods.meal_id ${adapterQuery};`;

      const result = await this.databaseService.query(query);

      if (result.rowCount === 0) {
        return undefined;
      }

      const mealMap = this.mapper.queryResultToModel(result);

      return this.mapper.toDomain(Object.values(mealMap)[0]);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async find(filter: MealFilter): Promise<Meal[]> {
    try {
      const adapter = new PostgreSqlMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      const query = `SELECT 
      meals.id,
      meals.name,
      meals.type,
      meals.created_at,
      meals.updated_at,
      meal_foods.id AS mealFood_id,
      meal_foods.meal_id AS mealFood_meal,
      meal_foods.food_id AS mealFood_food,
      meal_foods.amount AS mealFood_amount,
      meal_foods.unit AS mealFood_unit,
      meal_foods.created_at AS mealFood_created_at,
      meal_foods.updated_at AS mealFood_updated_at
      FROM meals
      LEFT JOIN meal_foods
      ON meals.id = meal_foods.meal_id;`;

      const result = await this.databaseService.query(query);

      const mealsMap = this.mapper.queryResultToModel(result);

      return Object.values(mealsMap).map((meal: MealModel) => {
        return this.mapper.toDomain(meal);
      });
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async save(entity: Meal): Promise<void> {
    try {
      const { foods, ...mealModel } = this.mapper.toModel(entity);

      const { columns, values } = this.databaseService.getColumnsAndValuesFromModel(mealModel);

      await this.databaseService.query('BEGIN;');

      const insertMealQuery = `INSERT INTO meals(${columns}) VALUES(${values});`;

      await this.databaseService.query(insertMealQuery);

      for (const food of foods) {
        const { columns, values } = this.databaseService.getColumnsAndValuesFromModel(food);

        const insertMealFoodQuery = `INSERT INTO meal_foods(${columns}) VALUES(${values})`;

        await this.databaseService.query(insertMealFoodQuery);
      }

      await this.databaseService.query('COMMIT;');
    } catch (error: any) {
      await this.databaseService.query('ROLLBACK;');

      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async update(entity: Meal): Promise<void> {
    try {
      const { foods, ...mealModel } = this.mapper.toModel(entity);

      const setClause = this.databaseService.getColumnEqualValueFromModel(mealModel);

      await this.databaseService.query('BEGIN;');

      const updateMealQuery = `UPDATE meals SET ${setClause} WHERE id = '${mealModel.id}';`;

      await this.databaseService.query(updateMealQuery);

      for (const food of foods) {
        const setClause = this.databaseService.getColumnEqualValueFromModel(food);

        const updateMealFoodQuery = `UPDATE meal_foods SET ${setClause} WHERE id = '${food.id}';`;

        const { rowCount } = await this.databaseService.query(updateMealFoodQuery);

        if (rowCount === 0) {
          const { columns, values } = this.databaseService.getColumnsAndValuesFromModel(food);

          const insertMealFoodQuery = `INSERT INTO meal_foods(${columns}) VALUES(${values})`;

          await this.databaseService.query(insertMealFoodQuery);
        }
      }

      await this.databaseService.query('COMMIT;');
    } catch (error: any) {
      await this.databaseService.query('ROLLBACK;');

      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async delete(entity: Meal): Promise<void> {
    try {
      const { foods, ...mealModel } = this.mapper.toModel(entity);

      await this.databaseService.query('BEGIN;');

      const deleteMealQuery = `DELETE FROM meals WHERE id = '${mealModel.id}';`;

      await this.databaseService.query(deleteMealQuery);

      for (const food of foods) {
        const deleteMealFoodQuery = `DELETE FROM meal_foods WHERE id = '${food.id}';`;

        await this.databaseService.query(deleteMealFoodQuery);
      }

      await this.databaseService.query('COMMIT;');
    } catch (error: any) {
      await this.databaseService.query('ROLLBACK;');

      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async deleteMealFood(id: Id): Promise<void> {
    try {
      const deleteMealFoodQuery = `DELETE FROM meal_foods WHERE id = '${id.value}';`;

      await this.databaseService.query(deleteMealFoodQuery);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }
}
