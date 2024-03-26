import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';

export class PgPermissionMapper implements IMapper<Permission, any> {
  public toDomain(dataModel: any): Permission {
    throw new Error('Method not implemented');
  }

  public toModel(entity: Permission): any {
    throw new Error('Method not implemented');
  }
}
