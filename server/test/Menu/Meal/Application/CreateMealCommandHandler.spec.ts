import {CreateMealCommandHandler} from "Menu/Meal/Application/CreateMeal/CreateMealCommandHandler";
import {IMealRepository} from "Menu/Meal/Domain/Repository/IMealRepository";
import {Test, TestingModule} from "@nestjs/testing";
import {IMEAL_REPOSITORY, MY_BENTO_LOGGER} from "Shared/Domain/InterfacesConstants";
import {mealStub} from "../../../stubs/Meal.stub";
import {CreateMealCommand} from "Menu/Meal/Application/CreateMeal/CreateMealCommand";
import {MealFilter} from "Menu/Meal/Domain/Filter/MealFilter";
import {MealAlreadyExistsError} from "Menu/Meal/Domain/Error/MealAlreadyExists";

describe('CreateMealCommandHandler', () => {
    let createMealCommandHandler: CreateMealCommandHandler;
    let mealRepository: IMealRepository;

    beforeEach(async () => {
        const fixedDate = new Date();
        jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);

        const module: TestingModule = await Test.createTestingModule({
            providers: [CreateMealCommandHandler, {
                provide: IMEAL_REPOSITORY, useValue: {findOne: jest.fn(), save: jest.fn()}
            }, {
                provide: MY_BENTO_LOGGER, useValue: {log: jest.fn()}
            }]
        }).compile();

        createMealCommandHandler = module.get<CreateMealCommandHandler>(CreateMealCommandHandler);
        mealRepository = module.get<IMealRepository>(IMEAL_REPOSITORY);
    });

    afterEach(() => {
        jest.restoreAllMocks()
    });

    it('should create a meal when it does not exist already', async () => {
        const newMeal = mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f');
        const mealFoods = newMeal.foods().map(food => ({
            id: food.id().value,
            foodId: food.foodId().value,
            amount: food.quantity().amount().value,
            unit: food.quantity().unit().value
        }));

        const command = new CreateMealCommand(
            newMeal.id().value,
            newMeal.name().value,
            newMeal.type().value,
            mealFoods,
            'trace-id-123');

        jest.spyOn(mealRepository, 'findOne').mockResolvedValue(undefined);

        await createMealCommandHandler.execute(command);

        const filter = MealFilter.create().withName(newMeal.name());

        expect(mealRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mealRepository.findOne).toHaveBeenCalledWith(filter);

        expect(mealRepository.save).toHaveBeenCalledTimes(1);
        expect(mealRepository.save).toHaveBeenCalledWith(newMeal);
    });

    it('should throw MealAlreadyExistsError when the meal we are trying to create already exists',
        async () => {
            const newMeal = mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f');
            const mealFood = {
                id: newMeal.foods()[0].id().value,
                foodId: newMeal.foods()[0].foodId().value,
                amount: newMeal.foods()[0].quantity().amount().value,
                unit: newMeal.foods()[0].quantity().unit().value
            }

            const command = new CreateMealCommand(
                newMeal.id().value,
                newMeal.name().value,
                newMeal.type().value,
                [mealFood],
                'trace-id-123');

            jest.spyOn(mealRepository, 'findOne').mockResolvedValue(newMeal);

            const filter = MealFilter.create().withName(newMeal.name());

            await expect(createMealCommandHandler.execute(command)).rejects.toThrow(MealAlreadyExistsError);

            expect(mealRepository.findOne).toHaveBeenCalledTimes(1);
            expect(mealRepository.findOne).toHaveBeenCalledWith(filter);

            expect(mealRepository.save).not.toHaveBeenCalled();
        })
})