import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateFoodController } from 'src/Menu/Food/Infrastructure/Controllers/CreateFood/CreateFoodController';
import { CreateFoodCommandHandler } from 'src/Menu/Food/Application/CreateFood/CreateFoodCommandHandler';
import { GetFoodsController } from 'src/Menu/Food/Infrastructure/Controllers/GetFoods/GetFoodsController';
import { GetFoodsQueryHandler } from 'src/Menu/Food/Application/GetFoods/GetFoodsQueryHandler';
import { MikroOrmFoodRepository } from 'Menu/Food/Infrastructure/Persistance/Repository/MikroOrmFoodRepository';
import { GetFoodQueryHandler } from 'src/Menu/Food/Application/GetFood/GetFoodQueryHandler';
import { GetFoodController } from 'src/Menu/Food/Infrastructure/Controllers/GetFood/GetFoodController';
import { UpdateFoodCommandHandler } from 'src/Menu/Food/Application/UpdateFood/UpdateFoodCommandHandler';
import { UpdateFoodController } from 'src/Menu/Food/Infrastructure/Controllers/UpdateFood/UpdateFoodController';
import { DeleteFoodCommandHandler } from 'src/Menu/Food/Application/DeleteFood/DeleteFoodCommandHandler';
import { DeleteFoodController } from 'src/Menu/Food/Infrastructure/Controllers/DeleteFood/DeleteFoodController';
import { FoodMapper } from 'Menu/Food/Infrastructure/Persistance/Mapper/FoodMapper';

const Repositories = [
  {
    provide: 'IFoodRepository',
    useClass: MikroOrmFoodRepository,
  },
];

const Controllers = [
  CreateFoodController,
  GetFoodsController,
  GetFoodController,
  UpdateFoodController,
  DeleteFoodController,
];

const Handlers = [
  CreateFoodCommandHandler,
  GetFoodsQueryHandler,
  GetFoodQueryHandler,
  UpdateFoodCommandHandler,
  DeleteFoodCommandHandler,
];

const Mappers = [FoodMapper];

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [...Repositories, ...Handlers, ...Mappers],
  exports: [],
})
export class MenuBoundedContext {}
