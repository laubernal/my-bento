import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class PostgreSqlDatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool!: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      // host: 'postgres_db',
      // port: 5432,
      // user: 'mybento',
      // password: 'password',
      // database: 'my-bento-db',
      // connectionString: 'postgresql://mybento:password@postgres_db:5432/my-bento-db',
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

  public async query(query: string, params?: any[]): Promise<any[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const result = await client.query(query, params);

      return result.rows;
    } catch (error: any) {
      console.log('ERROR', error);
      throw new Error(`Error executing query: ${error}`);
    } finally {
      client.release();
    }
  }
}
