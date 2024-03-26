import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { Permission } from '../Entity/Permission';

export interface IPermissionRepository extends IRepository<Permission> {}
