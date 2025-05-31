import {IMealRepository} from "Menu/Meal/Domain/Repository/IMealRepository";
import {GetMealsQueryHandler} from "Menu/Meal/Application/GetMeals/GetMealsQueryHandler";
import {Test} from "@nestjs/testing";
import {IMEAL_REPOSITORY, MY_BENTO_LOGGER} from "Shared/Domain/InterfacesConstants";
import {mealStub} from "../../../stubs/Meal.stub";
import {GetMealsQuery} from "Menu/Meal/Application/GetMeals/GetMealsQuery";
import {Meal} from "Menu/Meal/Domain/Entity/Meal";
import {GetMealsResponse} from "Menu/Meal/Application/GetMeals/GetMealsResponse";
import {MealFilter} from "Menu/Meal/Domain/Filter/MealFilter";
import {Name} from "Shared/Domain/Vo/Name.vo";
import {MealType} from "Shared/Domain/Vo/MealType";
import {StringVo} from "Shared/Domain/Vo/String.vo";

describe('GetMealsQueryHandler', () => {
    let getMealsQueryHandler: GetMealsQueryHandler;
    let mealRepository: IMealRepository;

    beforeEach(async () => {
        const fixedDate = new Date();
        jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);

        const module = await Test.createTestingModule({
            providers: [
                GetMealsQueryHandler,
                {
                    provide: IMEAL_REPOSITORY,
                    useValue: {find: jest.fn()}
                },
                {
                    provide: MY_BENTO_LOGGER,
                    useValue: {
                        log: jest.fn(),
                    },
                }]
        }).compile();

        getMealsQueryHandler = module.get<GetMealsQueryHandler>(GetMealsQueryHandler);
        mealRepository = module.get<IMealRepository>(IMEAL_REPOSITORY);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return GetMealsResponse', async () => {
        const meals = [
            mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f'),
            mealStub('cc329032-0309-4e22-b1ac-44cded999f42')
        ];

        const query = new GetMealsQuery('trace-id-123', {});

        const response = meals.map((meal: Meal) => {
            return GetMealsResponse.toResponse(meal)
        });

        jest.spyOn(mealRepository, 'find').mockResolvedValue(meals);

        const result = await getMealsQueryHandler.execute(query);

        const filter = MealFilter.create();

        expect(mealRepository.find).toHaveBeenCalledTimes(1);
        expect(mealRepository.find).toHaveBeenCalledWith(filter);

        expect(result).toEqual(response);
    });

    it('should return an empty array if no meals are found', async () => {
        const query = new GetMealsQuery('trace-id-123', {meal: 'NonExistentMeal'});

        jest.spyOn(mealRepository, 'find').mockResolvedValue([]);

        const result = await getMealsQueryHandler.execute(query);

        const filter = MealFilter.create().withName(new Name(query.searchQuery.meal));

        expect(mealRepository.find).toHaveBeenCalledWith(filter);

        expect(result).toEqual([]);
    });

    it.each([
        [{}, MealFilter.create()],
        [{meal: 'Bocata'}, MealFilter.create().withName(new Name('Bocata'))],
        [{type: 'breakfast'}, MealFilter.create().withType(new MealType(new StringVo('breakfast')))],
        [{
            meal: 'Bocata',
            type: 'breakfast'
        }, MealFilter.create().withName(new Name('Bocata')).withType(new MealType(new StringVo('breakfast')))],
    ])('should call repository with correct filter for query: %o', async (
        searchQuery,
        expectedFilter
    ) => {
       const query = new GetMealsQuery('trace-id-123', searchQuery);

        const meals = [
            mealStub('d4e2c830-a5cc-47d5-ad20-5bbe41382c2f'),
            mealStub('cc329032-0309-4e22-b1ac-44cded999f42')
        ];

        jest.spyOn(mealRepository, 'find').mockResolvedValue(meals);

        const result = await getMealsQueryHandler.execute(query);

        expect(mealRepository.find).toHaveBeenCalledTimes(1);
        expect(mealRepository.find).toHaveBeenCalledWith(expectedFilter);

        expect(result).toEqual(meals.map(meal => GetMealsResponse.toResponse(meal)));
    });
});