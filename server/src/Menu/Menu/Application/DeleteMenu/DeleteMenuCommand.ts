import {ICommand} from '@nestjs/cqrs';

export class DeleteMenuCommand implements ICommand {
    constructor(private _id: string, private _traceId: string) {
    }
    
    public get id(): string {
        return this._id;
    }
    
    public get traceId(): string {
        return this._traceId;
    }
    
    public static fromJson(id: string, traceId: string): DeleteMenuCommand {
        return new DeleteMenuCommand(id, traceId);
    }
}