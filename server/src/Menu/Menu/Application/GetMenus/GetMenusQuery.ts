import {IQuery} from '@nestjs/cqrs';

export class GetMenusQuery implements IQuery {
    constructor(private _traceId: string, private _searchQuery: Record<string, string>) {
    }
    
    public get traceId(): string {
        return this._traceId;
    }
    
    public get searchQuery(): Record<string, string> {
        return this._searchQuery;
    }
    
    public static fromJson(traceId: string, searchQuery: any): GetMenusQuery {
        return new GetMenusQuery(traceId, searchQuery);
    }
}
