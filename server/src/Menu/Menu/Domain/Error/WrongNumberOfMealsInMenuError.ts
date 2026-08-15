import {DomainError} from 'Shared/Domain/Error/DomainError';
import {ErrorCode} from 'Shared/Domain/constants';

export class WrongNumberOfMealsInMenuError extends DomainError {
    public errorCode = ErrorCode.APPLICATION_ERROR;
    
    constructor() {
        super('Wrong number of meals in menu error');
        
        Object.setPrototypeOf(this, WrongNumberOfMealsInMenuError.prototype);
    }
}