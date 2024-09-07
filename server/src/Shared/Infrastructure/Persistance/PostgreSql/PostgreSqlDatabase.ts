import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class PostgreSqlDatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool!: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      connectionString: this.configService.get<string>('DB_URL'),
    });
  }

  public async onModuleInit() {
    if (this.pool) {
      await this.pool.connect();

      console.log('Connected successfully to database');
      return;
    }

    console.log('Unable to connect to database');
  }

  public async onModuleDestroy() {
    await this.pool.end();
    console.log('Disconnected successfully from database');
  }

  public async query(
    query: string,
    params?: any[]
  ): Promise<{ rows: any[]; rowCount: number | null }> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query(query, params);

      return { rows: result.rows, rowCount: result.rowCount };
    } catch (error: any) {
      console.log('ERROR', error);
      throw new Error(`Error executing query: ${error}`);
    } finally {
      client.release();
    }
  }

  public getColumnsAndValuesFromModel(model: Record<string, any>): {
    columns: string;
    values: string;
  } {
    const columns = Object.keys(model).join(', ');
    const values = Object.values(model)
      .map(value => {
        if (value instanceof Date) {
          return `'${value.toISOString()}'`;
        }
        if (typeof value === 'string') {
          return `'${value}'`;
        }
        return value;
      })
      .join(', ');

    return { columns, values };
  }
}
