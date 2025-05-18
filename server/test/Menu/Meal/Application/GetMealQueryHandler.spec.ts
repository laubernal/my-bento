import {GetMealQueryHandler} from "Menu/Meal/Application/GetMeal/GetMealQueryHandler";
import {IMealRepository} from "Menu/Meal/Domain/Repository/IMealRepository";
import {Test, TestingModule} from "@nestjs/testing";
import {IMEAL_REPOSITORY} from "Shared/Domain/InterfacesConstants";
import {mealStub} from "../../../stubs/Meal.stub";
import {GetMealQuery} from "Menu/Meal/Application/GetMeal/GetMealQuery";
import {GetMealResponse} from "Menu/Meal/Application/GetMeal/GetMealResponse";
import {MealFilter} from "Menu/Meal/Domain/Filter/MealFilter";
import {Id} from "Shared/Domain/Vo/Id.vo";
import {RecordNotFoundError} from "Shared/Domain/Error/RecordNotFoundError";

describe('GetMealQueryHandler', () => {
    let getMealQueryHandler: GetMealQueryHandler;
    let mealRepository: IMealRepository;

    beforeEach(async () => {
        const fixedDate = new Date();
        jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetMealQueryHandler,
                {
                    provide: IMEAL_REPOSITORY,
                    useValue: {
                        findOne: jest.fn()
                    }
                }
            ]
        }).compile();

        getMealQueryHandler = module.get<GetMealQueryHandler>(GetMealQueryHandler);
        mealRepository = module.get<IMealRepository>(IMEAL_REPOSITORY);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return GetMealResponse when meal is found', async () => {
        const mealId = 'd4e2c830-a5cc-47d5-ad20-5bbe41382c2f';
        const query = new GetMealQuery(mealId, 'trace-id-123');

        const meal = mealStub(mealId);

        const response = GetMealResponse.toResponse(meal);

        jest.spyOn(mealRepository, 'findOne').mockResolvedValue(meal);

        const result = await getMealQueryHandler.execute(query);

        const filter = MealFilter.create().withId(new Id(mealId));

        expect(mealRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mealRepository.findOne).toHaveBeenCalledWith(filter);

        expect(result).toEqual(response);
    });


    it('should throw RecordNotFoundError when meal is not found', async () => {
        const mealId = 'd4e2c830-a5cc-47d5-ad20-5bbe41382c2f';
        const query = new GetMealQuery(mealId, 'trace-id-123');


        jest.spyOn(mealRepository, 'findOne').mockResolvedValue(undefined);

        await expect(getMealQueryHandler.execute(query)).rejects.toThrow(RecordNotFoundError);
    });
});