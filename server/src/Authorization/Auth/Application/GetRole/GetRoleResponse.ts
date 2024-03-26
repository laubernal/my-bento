import { Role } from 'Authorization/Auth/Domain/Entity/Role';

export class GetRoleResponse {
  public static fromDomain(role: Role): GetRoleResponse {
    return new GetRoleResponse(role.type().value);
  }

  constructor(readonly type: string) {}
}
