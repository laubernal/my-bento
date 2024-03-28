import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateFoodController } from 'src/Menu/Food/Infrastructure/Controllers/CreateFood/CreateFoodController';
import { CreateFoodCommandHandler } from 'src/Menu/Food/Application/CreateFood/CreateFoodCommandHandler';
import { GetFoodsController } from 'src/Menu/Food/Infrastructure/Controllers/GetFoods/GetFoodsController';
import { GetFoodsQueryHandler } from 'src/Menu/Food/Application/GetFoods/GetFoodsQueryHandler';
import { PgFoodRepository } from 'src/Menu/Food/Infrastructure/Persistance/Repository/PgFoodRepository';
import { GetFoodQueryHandler } from 'src/Menu/Food/Application/GetFood/GetFoodQueryHandler';
import { GetFoodController } from 'src/Menu/Food/Infrastructure/Controllers/GetFood/GetFoodController';

const Repositories = [
  {
    provide: 'IFoodRepository',
    useClass: PgFoodRepository,
  },
];

const Controllers = [CreateFoodController, GetFoodsController, GetFoodController];

const Handlers = [CreateFoodCommandHandler, GetFoodsQueryHandler, GetFoodQueryHandler];

// const Mappers = [PgFoodMapper];

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [
    ...Repositories,
    ...Handlers,
    // ...Mappers,
  ],
  exports: [],
})
export class MenuBoundedContext {}
