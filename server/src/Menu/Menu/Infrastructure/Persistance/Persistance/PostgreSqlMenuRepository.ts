import {Injectable} from '@nestjs/common';
import {Menu} from 'Menu/Menu/Domain/Entity/Menu';
import {IMenuRepository} from 'Menu/Menu/Domain/Repository/IMenuRepository';
import {PostgreSqlDatabaseService} from 'Shared/Infrastructure/Persistance/PostgreSql/PostgreSqlDatabase';
import {PostgreSqlMenuMapper} from 'Menu/Menu/Infrastructure/Persistance/Mapper/PostgreSqlMenuMapper';
import {MenuFilter} from 'Menu/Menu/Domain/Filter/MenuFilter';
import {PostgreSqlMenuFilterAdapter} from 'Menu/Menu/Infrastructure/Persistance/Filter/PostgreSqlMenuFilterAdapter';
import {MenuModel} from 'Shared/Infrastructure/Persistance/PostgreSql/Model/MenuModel';

@Injectable()
export class PostgreSqlMenuRepository implements IMenuRepository {
    constructor(
        private readonly mapper: PostgreSqlMenuMapper,
        private readonly databaseService: PostgreSqlDatabaseService
    ) {
    }
    
    public async findOne(filter: MenuFilter): Promise<Menu | undefined> {
        throw new Error('Method not implemented.');
    }
    
    public async find(filter: MenuFilter): Promise<Menu[]> {
        try {
            const adapter = new PostgreSqlMenuFilterAdapter(filter);
            const adapterQuery = adapter.apply();
            
            let leftJoinClauses = '';
            
            if (adapterQuery.includes('ORDER BY')) {
                const orderByClause = this.removePagination(adapterQuery);
                
                leftJoinClauses = this.prefixOrderBy(orderByClause, 'paginated_menus');
            }
            
            const query = `
                WITH paginated_menus AS (SELECT *
                                         FROM menus ${adapterQuery})
                SELECT paginated_menus.id,
                       paginated_menus.created_at,
                       paginated_menus.updated_at,
                       menus_meals.id         AS menuMeal_id,
                       menus_meals.meal_id    AS menuMeal_meal,
                       menus_meals.menu_id    AS menuMeal_menu,
                       menus_meals.date       AS menuMeal_date,
                       menus_meals.created_at AS menuMeal_created_at,
                       menus_meals.updated_at AS menuMeal_updated_at
                FROM paginated_menus
                         LEFT JOIN menus_meals
                                   ON paginated_menus.id = menus_meals.menu_id
                    ${leftJoinClauses};
            `;
            
            const result = await this.databaseService.query(query);
            
            const menusMap = this.mapper.queryResultToModel(result);
            
            return Object.values(menusMap).map((menu: MenuModel) => {
                return this.mapper.toDomain(menu);
            });
        } catch (error: any) {
            throw new Error(`Menu Repository Error -- ${error}`);
        }
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
    
    public async count(filter: MenuFilter): Promise<number> {
        try {
            const adapter = new PostgreSqlMenuFilterAdapter(filter);
            const adapterQuery = adapter.apply();
            
            let sanitizedQuery = this.removeOrder(adapterQuery);
            
            sanitizedQuery = this.removePagination(sanitizedQuery);
            
            const countQuery = `SELECT COUNT(id)
                                FROM menus ${sanitizedQuery};`;
            
            const response = await this.databaseService.query(countQuery);
            
            return response.rows[0].count ? parseInt(response.rows[0].count) : 0;
        } catch (error: any) {
            throw new Error(`Menu Repository Error -- ${error}`);
        }
    }
    
    private removeOrder(query: string): string {
        let sanitizedQuery = query.replace(/ORDER BY[\s\S]*?(?=(OFFSET|LIMIT|$))/gi, '');
        
        return sanitizedQuery.trim();
    }
    
    private removePagination(query: string): string {
        let sanitizedQuery = query.replace(/OFFSET\s+\d+/gi, '');
        
        sanitizedQuery = sanitizedQuery.replace(/LIMIT\s+\d+/gi, '');
        
        return sanitizedQuery.trim();
    }
    
    private prefixOrderBy(orderBy: string, prefix: string): string {
        return orderBy.replace(
            /ORDER BY\s+([\w\s,]+)$/i,
            (_, clause) => {
                return 'ORDER BY ' +
                    clause
                        .split(',')
                        .map((clause: any) => {
                            const [column, direction] = clause.trim().split(/\s+/);
                            
                            return `${prefix}.${column} ${direction ?? ''}`.trim();
                        })
                        .join(', ');
            }
        );
    }
}