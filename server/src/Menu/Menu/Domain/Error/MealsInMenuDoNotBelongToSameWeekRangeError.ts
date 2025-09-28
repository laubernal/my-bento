import {DomainError} from 'Shared/Domain/Error/DomainError';
import {ErrorCode} from 'Shared/Domain/constants';

export class MealsInMenuDoNotBelongToSameWeekRangeError extends DomainError {
    public errorCode = ErrorCode.APPLICATION_ERROR;
    
    constructor() {
        super('Meals in menu do not belong to same week range error');
        
        Object.setPrototypeOf(this, MealsInMenuDoNotBelongToSameWeekRangeError.prototype);
    }
}