import {ICommand} from '@nestjs/cqrs';
import {MenuMealType} from 'Menu/Shared/Domain/types';
import {UpdateMenuParams} from 'Menu/Menu/Infrastructure/Controllers/UpdateMenu/UpdateMenuParams';
import {UpdateMenuApiRequest} from 'Menu/Menu/Infrastructure/Controllers/UpdateMenu/UpdateMenuApiRequest';

export class UpdateMenuCommand implements ICommand {
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

    public static fromJson(params: UpdateMenuParams, body: UpdateMenuApiRequest, traceId: string): UpdateMenuCommand {
        return new UpdateMenuCommand(params.id, body.meals, traceId);
    }
}
