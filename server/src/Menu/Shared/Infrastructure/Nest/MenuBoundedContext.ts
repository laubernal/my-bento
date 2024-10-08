import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateFoodCommandHandler } from 'src/Menu/Food/Application/CreateFood/CreateFoodCommandHandler';
import { GetFoodsQueryHandler } from 'src/Menu/Food/Application/GetFoods/GetFoodsQueryHandler';
import { MikroOrmFoodRepository } from 'Menu/Food/Infrastructure/Persistance/Repository/MikroOrmFoodRepository';
import { GetFoodQueryHandler } from 'src/Menu/Food/Application/GetFood/GetFoodQueryHandler';
import { UpdateFoodCommandHandler } from 'src/Menu/Food/Application/UpdateFood/UpdateFoodCommandHandler';
import { DeleteFoodCommandHandler } from 'src/Menu/Food/Application/DeleteFood/DeleteFoodCommandHandler';
import { FoodMapper } from 'Menu/Food/Infrastructure/Persistance/Mapper/FoodMapper';
import { SharedModule } from 'Shared/Infrastructure/Nest/SharedModule';
import { GetFoodsController } from 'Menu/Food/Infrastructure/Controllers/GetFoods/GetFoodsController';
import { CreateFoodController } from 'Menu/Food/Infrastructure/Controllers/CreateFood/CreateFoodController';
import { MyBentoLogger } from 'Shared/Infrastructure/Logger/MyBentoLogger';
import {
  IFOOD_REPOSITORY,
  IMEAL_REPOSITORY,
  MY_BENTO_LOGGER,
} from 'Shared/Domain/InterfacesConstants';
import { CreateMealCommandHandler } from 'Menu/Meal/Application/CreateMeal/CreateMealCommandHandler';
import { GetMealsQueryHandler } from 'Menu/Meal/Application/GetMeals/GetMealsQueryHandler';
import { UpdateMealCommandHandler } from 'Menu/Meal/Application/UpdateMeal/UpdateMealCommandHandler';
import { DeleteMealCommandHandler } from 'Menu/Meal/Application/DeleteMeal/DeleteMealCommandHandler';
import { CreateMealController } from 'Menu/Meal/Infrastructure/Controllers/CreateMeal/CreateMealController';
import { GetMealController } from 'Menu/Meal/Infrastructure/Controllers/GetMeal/GetMealController';
import { GetMealsController } from 'Menu/Meal/Infrastructure/Controllers/GetMeals/GetMealsController';
import { DeleteMealController } from 'Menu/Meal/Infrastructure/Controllers/DeleteMeal/DeleteMealController';
import { UpdateMealController } from 'Menu/Meal/Infrastructure/Controllers/UpdateMeal/UpdateMealController';
import { MikroOrmMealRepository } from 'Menu/Meal/Infrastructure/Persistance/Persistance/MikroOrmMealRepository';
import { MealMapper } from 'Menu/Meal/Infrastructure/Persistance/Mapper/MealMapper';
import { MealFoodMapper } from 'Menu/Meal/Infrastructure/Persistance/Mapper/MealFoodMapper';
import { GetMealQueryHandler } from 'Menu/Meal/Application/GetMeal/GetMealQueryHandler';
import { PostgreSqlFoodRepository } from 'Menu/Food/Infrastructure/Persistance/Repository/PostgreSqlFoodRepository';
import { PostgreSqlFoodMapper } from 'Menu/Food/Infrastructure/Persistance/Mapper/PostgreSqlFoodMapper';
import { GetFoodController } from 'Menu/Food/Infrastructure/Controllers/GetFood/GetFoodController';
import { UpdateFoodController } from 'Menu/Food/Infrastructure/Controllers/UpdateFood/UpdateFoodController';
import { DeleteFoodController } from 'Menu/Food/Infrastructure/Controllers/DeleteFood/DeleteFoodController';
import { PostgreSqlMealMapper } from 'Menu/Meal/Infrastructure/Persistance/Mapper/PostgreSqlMealMapper';
import { PostgreSqlMealRepository } from 'Menu/Meal/Infrastructure/Persistance/Persistance/PostgreSqlMealRepository';

const Repositories = [
  {
    provide: IFOOD_REPOSITORY,
    // useClass: MikroOrmFoodRepository,
    useClass: PostgreSqlFoodRepository,
  },
  {
    provide: IMEAL_REPOSITORY,
    // useClass: MikroOrmMealRepository,
    useClass: PostgreSqlMealRepository,
  },
];

const Controllers = [
  // FOOD
  CreateFoodController,
  GetFoodController,
  UpdateFoodController,
  DeleteFoodController,
  GetFoodsController,
  // MEAL
  CreateMealController,
  GetMealController,
  GetMealsController,
  DeleteMealController,
  UpdateMealController,
];

const Handlers = [
  // FOOD
  CreateFoodCommandHandler,
  GetFoodsQueryHandler,
  GetFoodQueryHandler,
  UpdateFoodCommandHandler,
  DeleteFoodCommandHandler,
  // MEAL
  CreateMealCommandHandler,
  GetMealsQueryHandler,
  GetMealQueryHandler,
  UpdateMealCommandHandler,
  DeleteMealCommandHandler,
];

const Mappers = [
  FoodMapper,
  MealMapper,
  MealFoodMapper,
  PostgreSqlFoodMapper,
  PostgreSqlMealMapper,
];

const Services = [
  {
    provide: MY_BENTO_LOGGER,
    useClass: MyBentoLogger,
  },
];

@Module({
  imports: [CqrsModule, SharedModule],
  controllers: [...Controllers],
  providers: [...Repositories, ...Handlers, ...Mappers, ...Services],
  exports: [],
})
export class MenuBoundedContext {}
