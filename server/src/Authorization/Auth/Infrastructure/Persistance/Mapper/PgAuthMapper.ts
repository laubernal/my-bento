import { Auth } from 'Authorization/Auth/Domain/Entity/Auth';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';

export class PgAuthMapper implements IMapper<Auth, any> {
  public toDomain(dataModel: any): Auth {
    throw new Error('Method not implemented');
  }

  public toModel(entity: Auth): any {
    throw new Error('Method not implemented');
  }
}
