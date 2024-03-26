import { Filter } from "../Entities/Filter";

export interface IRepository<T> {
  findOne(filter: Filter): Promise<T>;

  find(filter: Filter): Promise<T[]>;

  save(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;
}
