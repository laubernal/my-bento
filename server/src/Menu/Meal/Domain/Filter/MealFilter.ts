import {Filter} from 'Shared/Domain/Entities/Filter';
import {Id} from 'Shared/Domain/Vo/Id.vo';
import {MealType} from 'Shared/Domain/Vo/MealType';
import {Name} from 'Shared/Domain/Vo/Name.vo';

export class MealFilter extends Filter {
    public static MEAL_NAME_FILTER = 'meal';
    public static MEAL_TYPE_FILTER = 'type';
    public static MEAL_ID_FILTER = 'id';
    public static MEAL_IDS_FILTER = 'ids';
    
    protected data: Map<string, any> = new Map();
    
    public static create(): MealFilter {
        return new MealFilter();
    }
    
    public withName(name: Name): this {
        this.data.set(MealFilter.MEAL_NAME_FILTER, name);
        return this;
    }
    
    public withType(type: MealType): this {
        this.data.set(MealFilter.MEAL_TYPE_FILTER, type);
        return this;
    }
    
    public withId(id: Id): this {
        this.data.set(MealFilter.MEAL_ID_FILTER, id);
        return this;
    }
    
    public withIds(ids: Id[]): this {
        this.data.set(MealFilter.MEAL_IDS_FILTER, ids);
        return this;
    }
    
    public apply(): Map<string, any> {
        return this.data;
    }
}
