import {UpdateMealCommandHandler} from "Menu/Meal/Application/UpdateMeal/UpdateMealCommandHandler";
import {IMealRepository} from "Menu/Meal/Domain/Repository/IMealRepository";
import {Test, TestingModule} from "@nestjs/testing";
import {IMEAL_REPOSITORY, MY_BENTO_LOGGER} from "Shared/Domain/InterfacesConstants";
import {mealStub} from "../../../stubs/Meal.stub";
import {UpdateMealCommand} from "Menu/Meal/Application/UpdateMeal/UpdateMealCommand";
import {MealFilter} from "Menu/Meal/Domain/Filter/MealFilter";
import {RecordNotFoundError} from "Shared/Domain/Error/RecordNotFoundError";

describe('UpdateMealCommandHandler', () => {
    let updateMealCommandHandler: UpdateMealCommandHandler;
    let mealRepository: IMealRepository;

    beforeEach(async () => {
        const fixedDate = new Date();
        jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);

        const module: TestingModule = await Test.createTestingModule({
            providers: [UpdateMealCommandHandler,
                {
                    provide: IMEAL_REPOSITORY,
                    useValue: {
                        findOne: jest.fn(),
                        update: jest.fn(),
                        deleteMealFood: jest.fn(),
                    },
                },
                {
                    provide: MY_BENTO_LOGGER,
                    useValue: {
                        log: jest.fn(),
                    },
                },
            ]
        }).compile();

        updateMealCommandHandler = module.get<UpdateMealCommandHandler>(UpdateMealCommandHandler);
        mealRepository = module.get<IMealRepository>(IMEAL_REPOSITORY);
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should update an existing meal', async () => {
        const mealToUpdate = mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f');
        const mealFoods = mealToUpdate.foods().map(food => ({
            id: food.id().value,
            foodId: food.foodId().value,
            amount: food.quantity().amount().value,
            unit: food.quantity().unit().value
        }));

        const command = new UpdateMealCommand(
            mealToUpdate.id().value,
            mealToUpdate.name().value,
            mealToUpdate.type().value,
            mealFoods,
            'trace-id-123'
        );

        const filter = MealFilter.create().withId(mealToUpdate.id());

        jest.spyOn(mealRepository, 'findOne').mockResolvedValue(mealToUpdate);

        await updateMealCommandHandler.execute(command);

        expect(mealRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mealRepository.findOne).toHaveBeenCalledWith(filter);

        expect(mealRepository.update).toHaveBeenCalledTimes(1);
        expect(mealRepository.update).toHaveBeenCalledWith(mealToUpdate);
    });

    it('should throw RecordNotFoundError when meal to update is not found', async () => {
        const mealToUpdate = mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f');
        const mealFood = {
            id: mealToUpdate.foods()[0].id().value,
            foodId: mealToUpdate.foods()[0].foodId().value,
            amount: mealToUpdate.foods()[0].quantity().amount().value,
            unit: mealToUpdate.foods()[0].quantity().unit().value
        }

        const command = new UpdateMealCommand(
            mealToUpdate.id().value,
            mealToUpdate.name().value,
            mealToUpdate.type().value,
            [mealFood],
            'trace-id-123'
        );

        const filter = MealFilter.create().withId(mealToUpdate.id());

        jest.spyOn(mealRepository, 'findOne').mockResolvedValue(undefined);

        await expect(updateMealCommandHandler.execute(command)).rejects.toThrow(RecordNotFoundError);

        expect(mealRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mealRepository.findOne).toHaveBeenCalledWith(filter);

        expect(mealRepository.update).not.toHaveBeenCalled();
    });

    it('should delete foods that are not present in the update command', async () => {
        const mealToUpdate = mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f');
        const [food, food2] = mealToUpdate.foods();

        const mealFood = {
            id: food2.id().value,
            foodId: food2.foodId().value,
            amount: food2.quantity().amount().value,
            unit: food2.quantity().unit().value
        }

        const command = new UpdateMealCommand(
            mealToUpdate.id().value,
            mealToUpdate.name().value,
            mealToUpdate.type().value,
            [mealFood],
            'trace-id-123'
        );

        jest.spyOn(mealRepository, 'findOne').mockResolvedValue(mealToUpdate);

        await updateMealCommandHandler.execute(command);

        expect(mealRepository.deleteMealFood).toHaveBeenCalledWith(food.id());
        expect(mealRepository.deleteMealFood).toHaveBeenCalledTimes(1);
    });

    it('should not delete any food if all foods are in the meal to update', async () => {
        const mealToUpdate = mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f');

        const mealFoods = mealToUpdate.foods().map(food => ({
            id: food.id().value,
            foodId: food.foodId().value,
            amount: food.quantity().amount().value,
            unit: food.quantity().unit().value
        }));

        const command = new UpdateMealCommand(
            mealToUpdate.id().value,
            mealToUpdate.name().value,
            mealToUpdate.type().value,
            mealFoods,
            'trace-id-123'
        );

        jest.spyOn(mealRepository, 'findOne').mockResolvedValue(mealToUpdate);

        await updateMealCommandHandler.execute(command);

        expect(mealRepository.deleteMealFood).not.toHaveBeenCalled();
    });

    it('should delete all meal foods if meal to update has empty array of foods', async () => {
        const mealToUpdate = mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f');
        const mealFoods = mealToUpdate.foods();

        const command = new UpdateMealCommand(
            mealToUpdate.id().value,
            mealToUpdate.name().value,
            mealToUpdate.type().value,
            [],
            'trace-id-123'
        );

        jest.spyOn(mealRepository, 'findOne').mockResolvedValue(mealToUpdate);

        await updateMealCommandHandler.execute(command);

        for (const mealFood of mealFoods) {
            console.log(mealFood);
            expect(mealRepository.deleteMealFood).toHaveBeenCalledWith(mealFood.id())
        }

        expect(mealRepository.deleteMealFood).toHaveBeenCalledTimes(mealFoods.length);
    });
});