import {IQuery} from '@nestjs/cqrs';

export class GetMenuQuery implements IQuery {
    constructor(private _traceId: string, private _id: string) {
    }
    
    public get traceId(): string {
        return this._traceId;
    }
    
    public get id(): string {
        return this._id;
    }
    
    public static fromJson(traceId: string, id: string): GetMenuQuery {
        return new GetMenuQuery(traceId, id);
    }
}
