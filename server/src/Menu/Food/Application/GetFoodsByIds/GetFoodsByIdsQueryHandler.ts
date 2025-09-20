import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetFoodsByIdsQuery} from "Menu/Food/Application/GetFoodsByIds/GetFoodsByIdsQuery";
import {FoodFilter} from "Menu/Food/Domain/Filter/FoodFilter";
import {Id} from "Shared/Domain/Vo/Id.vo";
import {Inject} from "@nestjs/common";
import {IFOOD_REPOSITORY} from "Shared/Domain/InterfacesConstants";
import {IFoodRepository} from "Menu/Food/Domain/Repository/IFoodRepository";
import {Food} from "Menu/Food/Domain/Entity/Food";
import {GetFoodsResponse} from "Menu/Food/Application/GetFoods/GetFoodsResponse";

@QueryHandler(GetFoodsByIdsQuery)
export class GetFoodsByIdsQueryHandler implements IQueryHandler<GetFoodsByIdsQuery, GetFoodsResponse[]> {
    constructor(@Inject(IFOOD_REPOSITORY) private readonly repository: IFoodRepository) {
    }

    public async execute(query: GetFoodsByIdsQuery): Promise<GetFoodsResponse[]> {
        const foods: Food[] = await this.findFoods(query);

        return foods.map((food: Food) => {
            return GetFoodsResponse.toResponse(food);
        });
    }

    private async findFoods(query: GetFoodsByIdsQuery): Promise<Food[]> {
        const ids: Id[] = query.ids.map(id => new Id(id.trim()));

        const filter = FoodFilter.create().withIds(ids);

        return this.repository.find(filter);
    }

}