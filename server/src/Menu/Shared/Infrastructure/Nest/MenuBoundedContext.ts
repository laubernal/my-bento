import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateFoodController } from 'src/Menu/Food/Infrastructure/Controllers/CreateFood/CreateFoodController';
import { CreateFoodCommandHandler } from 'src/Menu/Food/Application/CreateFood/CreateFoodCommandHandler';

// const Repositories = [
// {
//   provide: 'IFoodRepository',
//   useClass: PgFoodRepository,
// },
// ];

const Controllers = [CreateFoodController];

const Handlers = [CreateFoodCommandHandler];

// const Mappers = [PgFoodMapper];

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [
    // ...Repositories,
    ...Handlers,
    // ...Mappers,
  ],
  exports: [],
})
export class MenuBoundedContext {}
