import {IQuery} from "@nestjs/cqrs";

export class GetFoodsByIdsQuery implements IQuery {
    constructor(private _traceId: string, private _ids: string[]) {
    }

    public get traceId(): string {
        return this._traceId;
    }

    public get ids(): string[] {
        return this._ids;
    }

    public static fromJson(traceId: string, ids: string[]): GetFoodsByIdsQuery {
        return new GetFoodsByIdsQuery(traceId, ids)
    }
}