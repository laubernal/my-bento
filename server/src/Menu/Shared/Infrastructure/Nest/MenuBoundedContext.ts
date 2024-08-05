import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateFoodCommandHandler } from 'src/Menu/Food/Application/CreateFood/CreateFoodCommandHandler';
import { GetFoodsQueryHandler } from 'src/Menu/Food/Application/GetFoods/GetFoodsQueryHandler';
import { MikroOrmFoodRepository } from 'Menu/Food/Infrastructure/Persistance/Repository/MikroOrmFoodRepository';
import { GetFoodQueryHandler } from 'src/Menu/Food/Application/GetFood/GetFoodQueryHandler';
import { GetFoodController } from 'src/Menu/Food/Infrastructure/Controllers/GetFood/GetFoodController';
import { UpdateFoodCommandHandler } from 'src/Menu/Food/Application/UpdateFood/UpdateFoodCommandHandler';
import { UpdateFoodController } from 'src/Menu/Food/Infrastructure/Controllers/UpdateFood/UpdateFoodController';
import { DeleteFoodCommandHandler } from 'src/Menu/Food/Application/DeleteFood/DeleteFoodCommandHandler';
import { DeleteFoodController } from 'src/Menu/Food/Infrastructure/Controllers/DeleteFood/DeleteFoodController';
import { FoodMapper } from 'Menu/Food/Infrastructure/Persistance/Mapper/FoodMapper';
import { SharedModule } from 'Shared/Infrastructure/Nest/SharedModule';
import { GetFoodsController } from 'Menu/Food/Infrastructure/Controllers/GetFoods/GetFoodsController';
import { CreateFoodController } from 'Menu/Food/Infrastructure/Controllers/CreateFood/CreateFoodController';
import { MyBentoLogger } from 'Shared/Infrastructure/Logger/MyBentoLogger';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';

const Repositories = [
  {
    provide: IFOOD_REPOSITORY,
    useClass: MikroOrmFoodRepository,
  },
];

const Controllers = [
  CreateFoodController,
  GetFoodController,
  UpdateFoodController,
  DeleteFoodController,
  GetFoodsController,
];

const Handlers = [
  CreateFoodCommandHandler,
  GetFoodsQueryHandler,
  GetFoodQueryHandler,
  UpdateFoodCommandHandler,
  DeleteFoodCommandHandler,
];

const Mappers = [FoodMapper];

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
