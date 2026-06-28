import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {DeleteMenuCommand} from 'Menu/Menu/Application/DeleteMenu/DeleteMenuCommand';
import {Inject} from '@nestjs/common';
import {IMENU_REPOSITORY} from 'Shared/Domain/InterfacesConstants';
import {IMenuRepository} from 'Menu/Menu/Domain/Repository/IMenuRepository';
import {Id} from 'Shared/Domain/Vo/Id.vo';
import {RecordNotFoundError} from 'Shared/Domain/Error/RecordNotFoundError';
import {MenuFilter} from 'Menu/Menu/Domain/Filter/MenuFilter';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';

@CommandHandler(DeleteMenuCommand)
export class DeleteMenuCommandHandler implements ICommandHandler {
    constructor(@Inject(IMENU_REPOSITORY) private readonly repository: IMenuRepository) {
    }
    
    public async execute(command: any): Promise<any> {
        const id = new Id(command.id);
        
        const meal = await this.findMenu(id);
        
        await this.repository.delete(meal);
    }
    
    private async findMenu(id: Id): Promise<Menu> {
        const filter = MenuFilter.create().withId(id);
        
        const result = await this.repository.findOne(filter);
        
        if (typeof result === 'undefined') {
            throw new RecordNotFoundError();
        }
        
        return result;
    }
}