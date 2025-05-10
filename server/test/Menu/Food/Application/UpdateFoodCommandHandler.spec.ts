import { Test, TestingModule } from '@nestjs/testing';
import { UpdateFoodCommand } from 'Menu/Food/Application/UpdateFood/UpdateFoodCommand';
import { UpdateFoodCommandHandler } from 'Menu/Food/Application/UpdateFood/UpdateFoodCommandHandler';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { IFoodRepository } from 'Menu/Food/Domain/Repository/IFoodRepository';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { foodStub } from 'test/stubs/Food.stub';

describe('UpdateFoodCommandHandler', () => {
  let updateFoodCommandHandler: UpdateFoodCommandHandler;
  let foodRepository: IFoodRepository;

  beforeEach(async () => {
    const fixedDate = new Date();
    jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateFoodCommandHandler,
        {
          provide: IFOOD_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
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

    updateFoodCommandHandler = module.get<UpdateFoodCommandHandler>(UpdateFoodCommandHandler);
    foodRepository = module.get<IFoodRepository>(IFOOD_REPOSITORY);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should update an existing food', async () => {
    const foodToUpdate = foodStub('dc789b73-6687-4739-92ce-4373c9a0dbf2');

    const command = new UpdateFoodCommand(
      foodToUpdate.id().value,
      foodToUpdate.name().value,
      foodToUpdate.category().value,
      'trace-id-123'
    );

    const filter = FoodFilter.create().withId(foodToUpdate.id());

    jest.spyOn(foodRepository, 'findOne').mockResolvedValue(foodToUpdate);

    await updateFoodCommandHandler.execute(command);

    expect(foodRepository.findOne).toHaveBeenCalledTimes(1);
    expect(foodRepository.findOne).toHaveBeenCalledWith(filter);

    expect(foodRepository.update).toHaveBeenCalledTimes(1);
    expect(foodRepository.update).toHaveBeenCalledWith(foodToUpdate);
  });

  it('should throw RecordNotFoundError when food to update is not found', async () => {
    const foodToUpdate = foodStub('dc789b73-6687-4739-92ce-4373c9a0dbf2');

    const command = new UpdateFoodCommand(
      foodToUpdate.id().value,
      foodToUpdate.name().value,
      foodToUpdate.category().value,
      'trace-id-123'
    );

    const filter = FoodFilter.create().withId(foodToUpdate.id());

    jest.spyOn(foodRepository, 'findOne').mockResolvedValue(undefined);

    await expect(updateFoodCommandHandler.execute(command)).rejects.toThrow(RecordNotFoundError);

    expect(foodRepository.findOne).toHaveBeenCalledTimes(1);
    expect(foodRepository.findOne).toHaveBeenCalledWith(filter);

    expect(foodRepository.update).not.toHaveBeenCalled();
  });
});
