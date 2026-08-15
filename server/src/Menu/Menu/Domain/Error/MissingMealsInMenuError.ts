import {DomainError} from 'Shared/Domain/Error/DomainError';
import {ErrorCode} from 'Shared/Domain/constants';

export class MissingMealsInMenuError extends DomainError {
    public errorCode = ErrorCode.APPLICATION_ERROR;
    
    constructor() {
        super('Missing meals in menu error');
        
        Object.setPrototypeOf(this, MissingMealsInMenuError.prototype);
    }
}