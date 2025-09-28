import {Injectable} from '@nestjs/common';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';
import {IMenuRepository} from 'Menu/Menu/Domain/Repository/IMenuRepository';
import {Filter} from 'Shared/Domain/Entities/Filter';

@Injectable()
export class PostgreSqlMenuRepository implements IMenuRepository {
    public async findOne(filter: Filter): Promise<Menu | undefined> {
        throw new Error('Method not implemented.');
    }
    
    public async find(filter: Filter): Promise<Menu[]> {
        throw new Error('Method not implemented.');
    }
    
    public async save(entity: Menu): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    public async update(entity: Menu): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    public async delete(entity: Menu): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}