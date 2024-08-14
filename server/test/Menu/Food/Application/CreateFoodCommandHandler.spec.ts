import { Test, TestingModule } from '@nestjs/testing';
import { CreateFoodCommand } from 'Menu/Food/Application/CreateFood/CreateFoodCommand';
import { CreateFoodCommandHandler } from 'Menu/Food/Application/CreateFood/CreateFoodCommandHandler';
import { FoodAlreadyExistsError } from 'Menu/Food/Domain/Error/FoodAlreadyExists';
import { IFoodRepository } from 'Menu/Food/Domain/Repository/IFoodRepository';
import { IFOOD_REPOSITORY, MY_BENTO_LOGGER } from 'Shared/Domain/InterfacesConstants';
import { FoodFilter } from 'Menu/Food/Domain/Filter/FoodFilter';
import { foodStub } from 'test/stubs/Food.stub';

describe('CreateFoodCommandHandler', () => {
  let createFoodCommandHandler: CreateFoodCommandHandler;
  let foodRepository: IFoodRepository;

  beforeEach(async () => {
    const fixedDate = new Date();
    jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateFoodCommandHandler,
        {
          provide: IFOOD_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
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

    createFoodCommandHandler = module.get<CreateFoodCommandHandler>(CreateFoodCommandHandler);
    foodRepository = module.get<IFoodRepository>(IFOOD_REPOSITORY);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create a food when it does not exist already', async () => {
    const newFood = foodStub('dc789b73-6687-4739-92ce-4373c9a0dbf2');

    const command = new CreateFoodCommand(
      newFood.id().value,
      newFood.name().value,
      newFood.category().value,
      newFood.quantity().amount().value,
      newFood.quantity().unit().value,
      'trace-id-123'
    );

    jest.spyOn(foodRepository, 'findOne').mockResolvedValue(undefined);

    await createFoodCommandHandler.execute(command);

    const filter = FoodFilter.create().withName(newFood.name());

    expect(foodRepository.findOne).toHaveBeenCalledTimes(1);
    expect(foodRepository.findOne).toHaveBeenCalledWith(filter);

    expect(foodRepository.save).toHaveBeenCalledTimes(1);
    expect(foodRepository.save).toHaveBeenCalledWith(newFood);
  });

  it('should throw FoodAlreadyExistsError when the food we are trying to create already exists', async () => {
    const newFood = foodStub('dc789b73-6687-4739-92ce-4373c9a0dbf2');

    const command = new CreateFoodCommand(
      newFood.id().value,
      newFood.name().value,
      newFood.category().value,
      newFood.quantity().amount().value,
      newFood.quantity().unit().value,
      'trace-id-123'
    );

    jest.spyOn(foodRepository, 'findOne').mockResolvedValue(newFood);

    const filter = FoodFilter.create().withName(newFood.name());

    await expect(createFoodCommandHandler.execute(command)).rejects.toThrow(FoodAlreadyExistsError);

    expect(foodRepository.findOne).toHaveBeenCalledTimes(1);
    expect(foodRepository.findOne).toHaveBeenCalledWith(filter);

    expect(foodRepository.save).not.toHaveBeenCalled();
  });
});
