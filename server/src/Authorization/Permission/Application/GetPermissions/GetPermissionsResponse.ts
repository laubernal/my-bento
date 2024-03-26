import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';

export class GetPermissionsResponse {
  public static fromDomain(permission: Permission): GetPermissionsResponse {
    const urlList = permission.moduleUrl().map(url => {
      return url.value;
    });

    return new GetPermissionsResponse(
      permission.id().value,
      permission.tenantId().value,
      permission.moduleId().value,
      permission.moduleName().value,
      urlList
    );
  }

  constructor(
    readonly id: string,
    readonly tenantId: string,
    readonly moduleId: string,
    readonly moduleName: string,
    readonly moduleUrl: string[]
  ) {}
}
