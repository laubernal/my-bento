import { GetFoodQueryHandler } from 'Menu/Food/Application/GetFood/GetFoodQueryHandler';
import { IFoodRepository } from 'Menu/Food/Domain/Repository/IFoodRepository';
import { IMyBentoLogger } from 'Shared/Domain/Interfaces/IMyBentoLogger';
import { Test, TestingModule } from '@nestjs/testing';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { GetFoodQuery } from 'Menu/Food/Application/GetFood/GetFoodQuery';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { GetFoodResponse } from 'Menu/Food/Application/GetFood/GetFoodResponse';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { foodStub } from 'test/stubs/Food.stub';

describe('GetFoodQueryHandler', () => {
  let getFoodQueryHandler: GetFoodQueryHandler;
  let foodRepository: IFoodRepository;
  let logger: IMyBentoLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetFoodQueryHandler,
        {
          provide: IFOOD_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
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

    getFoodQueryHandler = module.get<GetFoodQueryHandler>(GetFoodQueryHandler);
    foodRepository = module.get<IFoodRepository>(IFOOD_REPOSITORY);
    logger = module.get<IMyBentoLogger>(MY_BENTO_LOGGER);
  });

  it('should return GetFoodResponse when food is found', async () => {
    const foodId = 'dc789b73-6687-4739-92ce-4373c9a0dbf2';
    const query = new GetFoodQuery(foodId, 'trace-id-123');

    const food = foodStub(foodId);

    const response = GetFoodResponse.toResponse(food);

    jest.spyOn(foodRepository, 'findOne').mockResolvedValue(food);

    const result = await getFoodQueryHandler.execute(query);

    const filter = FoodFilter.create().withId(new Id(foodId));

    expect(foodRepository.findOne).toHaveBeenCalledTimes(1);
    expect(foodRepository.findOne).toHaveBeenCalledWith(filter);

    expect(result).toEqual(response);
  });

  it('should throw RecordNotFoundError when food is not found', async () => {
    const query = new GetFoodQuery('dc789b73-6687-4739-92ce-4373c9a0dbf2', 'trace-id-123');

    jest.spyOn(foodRepository, 'findOne').mockResolvedValue(undefined);

    await expect(getFoodQueryHandler.execute(query)).rejects.toThrow(RecordNotFoundError);
  });
});
