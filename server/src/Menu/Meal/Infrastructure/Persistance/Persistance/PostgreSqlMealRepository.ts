import { Injectable } from '@nestjs/common';
import { PostgreSqlDatabaseService } from 'Shared/Infrastructure/Persistance/PostgreSql/PostgreSqlDatabase';
import { PostgreSqlMealMapper } from '../Mapper/PostgreSqlMealMapper';
import { MealFilter } from 'Menu/Meal/Domain/Filter/MealFilter';
import { PostgreSqlMealFilterAdapter } from '../Filter/PostgreSqlMealFilterAdapter';
import { Meal } from 'Menu/Meal/Domain/Entity/Meal';
import { IMealRepository } from 'Menu/Meal/Domain/Repository/IMealRepository';
import { MealModel } from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MealModel';

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

      const query = `SELECT * FROM meals ${adapterQuery};`;

      const result = await this.databaseService.query(query);

      if (result.rowCount === 0) {
        return undefined;
      }

      return this.mapper.toDomain(result.rows[0]);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async find(filter: MealFilter): Promise<Meal[]> {
    try {
      const adapter = new PostgreSqlMealFilterAdapter(filter);
      const adapterQuery = adapter.apply();

      console.log('ADAPTER QUERY', adapterQuery);

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

      console.log('RESULT', result.rows);

      const mealsMap: { [key: string]: MealModel } = {};

      result.rows.forEach(row => {
        const mealId = row.id;

        if (!mealsMap[mealId]) {
          mealsMap[mealId] = {
            id: row.id,
            name: row.name,
            type: row.type,
            created_at: row.created_at,
            updated_at: row.updated_at,
            foods: [],
          };
        }

        if (row.mealfood_id) {
          mealsMap[mealId].foods.push({
            id: row.mealfood_id,
            meal: row.mealfood_meal,
            food: row.mealfood_food,
            amount: row.mealfood_amount,
            unit: row.mealfood_unit,
            created_at: row.mealfood_created_at,
            updated_at: row.mealfood_updated_at,
          });
        }
      });

      console.log('HEREEEEEEEEEEEEEEEE ------------------', JSON.stringify(mealsMap, null, 4));

      return result.rows.map((meal: MealModel) => {
        // const mealFoodModel = Object.fromEntries(
        //   Object.entries(meal)
        //     .filter(([key]) => key.startsWith('mealfood_'))
        //     .map(([key, value]) => [key.replace('mealfood_', ''), value])
        // );

        // console.log('HEREEE', mealFoodModel);
        // const mealModel = Object.fromEntries(
        //     Object.entries(meal).filter(([key]) => !key.startsWith('mealfood_'))
        // );

        // mealModel.foods = mealFoodModel

        return this.mapper.toDomain(meal);
      });
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async save(entity: Meal): Promise<void> {
    try {
      const model = this.mapper.toModel(entity);

      const { columns, values } = this.databaseService.getColumnsAndValuesFromModel(model);

      const query = `INSERT INTO meals(${columns}) VALUES(${values});`;

      await this.databaseService.query(query);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async update(entity: Meal): Promise<void> {
    try {
      const model = this.mapper.toModel(entity);

      const setClause = this.databaseService.getColumnEqualValueFromModel(model);

      const query = `UPDATE meals SET ${setClause} WHERE id = '${model.id}';`;

      await this.databaseService.query(query);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }

  public async delete(entity: Meal): Promise<void> {
    try {
      const model = this.mapper.toModel(entity);

      const query = `DELETE FROM meals WHERE id = '${model.id}';`;

      await this.databaseService.query(query);
    } catch (error: any) {
      throw new Error(`Meal Repository Error -- ${error}`);
    }
  }
}
