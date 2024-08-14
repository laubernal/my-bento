import { Test, TestingModule } from '@nestjs/testing';
import { GetFoodsQuery } from 'Menu/Food/Application/GetFoods/GetFoodsQuery';
import { GetFoodsQueryHandler } from 'Menu/Food/Application/GetFoods/GetFoodsQueryHandler';
import { GetFoodsResponse } from 'Menu/Food/Application/GetFoods/GetFoodsResponse';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { IFoodRepository } from 'Menu/Food/Domain/Repository/IFoodRepository';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { foodStub } from 'test/stubs/Food.stub';

describe('GetFoodsQueryHandler', () => {
  let getFoodsQueryHandler: GetFoodsQueryHandler;
  let foodRepository: IFoodRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFoodsQueryHandler,
        {
          provide: IFOOD_REPOSITORY,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: MY_BENTO_LOGGER,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    getFoodsQueryHandler = module.get<GetFoodsQueryHandler>(GetFoodsQueryHandler);
    foodRepository = module.get<IFoodRepository>(IFOOD_REPOSITORY);
  });

  it('should return GetFoodsResponse', async () => {
    const query = new GetFoodsQuery('trace-id-123');

    const food = foodStub('dc789b73-6687-4739-92ce-4373c9a0dbf2');

    const response = [GetFoodsResponse.toResponse(food)];

    jest.spyOn(foodRepository, 'find').mockResolvedValue([food]);

    const result = await getFoodsQueryHandler.execute(query);

    const filter = FoodFilter.create();

    expect(foodRepository.find).toHaveBeenCalledTimes(1);
    expect(foodRepository.find).toHaveBeenCalledWith(filter);

    expect(result).toEqual(response);
  });
});
