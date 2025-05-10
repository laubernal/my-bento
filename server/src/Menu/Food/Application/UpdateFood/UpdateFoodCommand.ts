import {ICommand} from '@nestjs/cqrs';
import {UpdateFoodApiRequest} from '../../Infrastructure/Controllers/UpdateFood/UpdateFoodApiRequest';
import {UpdateFoodParams} from '../../Infrastructure/Controllers/UpdateFood/UpdateFoodParams';

export class UpdateFoodCommand implements ICommand {
    public static fromJson(
        body: UpdateFoodApiRequest,
        params: UpdateFoodParams,
        traceId: string
    ): UpdateFoodCommand {
        return new UpdateFoodCommand(params.id, body.name, body.category, traceId);
    }

    constructor(
        private _id: string,
        private _name: string,
        private _category: string,
        private _traceId: string
    ) {
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get category(): string {
        return this._category;
    }

    public get traceId(): string {
        return this._traceId;
    }
}
