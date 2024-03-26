import { IQuery } from '@nestjs/cqrs';
import { GetPermissionsApiRequest } from 'Authorization/Permission/Infrastructure/Controller/GetPermissions/GetPermissionsApiRequest';

export class GetPermissionsQuery implements IQuery {
  constructor(private readonly _tenantId: string) {}

  public static fromJson(json: GetPermissionsApiRequest): GetPermissionsQuery {
    return new GetPermissionsQuery(json.tenantId);
  }

  get tenantId(): string {
    return this._tenantId;
  }
}
