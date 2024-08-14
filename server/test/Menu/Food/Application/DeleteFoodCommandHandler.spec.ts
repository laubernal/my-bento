import { Test, TestingModule } from '@nestjs/testing';
import { DeleteFoodCommand } from 'Menu/Food/Application/DeleteFood/DeleteFoodCommand';
import { DeleteFoodCommandHandler } from 'Menu/Food/Application/DeleteFood/DeleteFoodCommandHandler';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { IFoodRepository } from 'Menu/Food/Domain/Repository/IFoodRepository';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { foodStub } from '../../../stubs/Food.stub';

describe('DeleteFoodCommandHandler', () => {
  let deleteFoodCommandHandler: DeleteFoodCommandHandler;
  let foodRepository: IFoodRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteFoodCommandHandler,
        {
          provide: IFOOD_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
            delete: jest.fn(),
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

    deleteFoodCommandHandler = module.get<DeleteFoodCommandHandler>(DeleteFoodCommandHandler);
    foodRepository = module.get<IFoodRepository>(IFOOD_REPOSITORY);
  });

  it('should delete an existing food', async () => {
    const foodId = new Id('dc789b73-6687-4739-92ce-4373c9a0dbf2');

    const command = new DeleteFoodCommand(foodId.value, 'trace-id-123');

    const foodToDelete = foodStub(foodId.value);

    const filter = FoodFilter.create().withId(foodId);

    jest.spyOn(foodRepository, 'findOne').mockResolvedValue(foodToDelete);

    await deleteFoodCommandHandler.execute(command);

    expect(foodRepository.findOne).toHaveBeenCalledTimes(1);
    expect(foodRepository.findOne).toHaveBeenCalledWith(filter);

    expect(foodRepository.delete).toHaveBeenCalledTimes(1);
    expect(foodRepository.delete).toHaveBeenCalledWith(foodToDelete);
  });

  it('should throw RecordNotFound when food does not exist', async () => {
    const foodId = new Id('dc789b73-6687-4739-92ce-4373c9a0dbf2');

    const command = new DeleteFoodCommand(foodId.value, 'trace-id-123');

    const filter = FoodFilter.create().withId(foodId);

    jest.spyOn(foodRepository, 'findOne').mockResolvedValue(undefined);

    await expect(deleteFoodCommandHandler.execute(command)).rejects.toThrow(RecordNotFoundError);

    expect(foodRepository.findOne).toHaveBeenCalledTimes(1);
    expect(foodRepository.findOne).toHaveBeenCalledWith(filter);

    expect(foodRepository.delete).not.toHaveBeenCalled();
  });
});
