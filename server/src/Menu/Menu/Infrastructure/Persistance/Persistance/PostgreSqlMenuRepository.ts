import {Injectable} from '@nestjs/common';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';
import {IMenuRepository} from 'Menu/Menu/Domain/Repository/IMenuRepository';
import {Filter} from 'Shared/Domain/Entities/Filter';
import {PostgreSqlDatabaseService} from 'Shared/Infrastructure/Persistance/PostgreSql/PostgreSqlDatabase';
import {PostgreSqlMenuMapper} from 'Menu/Menu/Infrastructure/Persistance/Mapper/PostgreSqlMenuMapper';

@Injectable()
export class PostgreSqlMenuRepository implements IMenuRepository {
    constructor(
        private readonly mapper: PostgreSqlMenuMapper,
        private readonly databaseService: PostgreSqlDatabaseService
    ) {
    }
    
    public async findOne(filter: Filter): Promise<Menu | undefined> {
        throw new Error('Method not implemented.');
    }
    
    public async find(filter: Filter): Promise<Menu[]> {
        throw new Error('Method not implemented.');
    }
    
    public async save(entity: Menu): Promise<void> {
        try {
            const {meals, ...menu} = this.mapper.toModel(entity);
            
            const {columns, values} = this.databaseService.getColumnsAndValuesFromModel(menu);
            
            await this.databaseService.query('BEGIN;');
            
            const insertMenuQuery = `INSERT INTO menus(${columns})
                                     VALUES (${values});`;
            
            await this.databaseService.query(insertMenuQuery);
            
            for (const meal of meals) {
                const {columns, values} = this.databaseService.getColumnsAndValuesFromModel(meal);
                
                const insertMealQuery = `INSERT INTO menus_meals(${columns})
                                             VALUES (${values})`;
                
                await this.databaseService.query(insertMealQuery);
            }
            
            await this.databaseService.query('COMMIT;');
        } catch (error: any) {
            await this.databaseService.query('ROLLBACK;');
            
            throw new Error(`Menu Repository Error -- ${error}`);
        }
    }
    
    public async update(entity: Menu): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    public async delete(entity: Menu): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}