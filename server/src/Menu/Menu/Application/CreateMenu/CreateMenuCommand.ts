import {ICommand} from '@nestjs/cqrs';
import {MenuMealType} from 'Menu/Shared/Domain/types';
import {CreateMenuApiRequest} from 'Menu/Menu/Infrastructure/Controllers/CreateMenu/CreateMenuApiRequest';

export class CreateMenuCommand implements ICommand {
    constructor(
        private _id: string,
        private _meals: MenuMealType[],
        private _traceId: string
    ) {
    }
    
    public get id(): string {
        return this._id;
    }
    
    public get meals(): MenuMealType[] {
        return this._meals;
    }
    
    public get traceId(): string {
        return this._traceId;
    }
    
    public static fromJson(body: CreateMenuApiRequest, traceId: string): CreateMenuCommand {
        {
            return new CreateMenuCommand(body.id, body.meals, traceId);
        }
    }
}