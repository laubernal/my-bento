import { Role } from 'Authorization/Auth/Domain/Entity/Role';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';

export class PgRoleMapper implements IMapper<Role, any> {
  public toDomain(dataModel: any): Role {
    throw new Error('Method not implemented');
  }

  public toModel(entity: Role): any {
    throw new Error('Method not implemented');
  }
}
