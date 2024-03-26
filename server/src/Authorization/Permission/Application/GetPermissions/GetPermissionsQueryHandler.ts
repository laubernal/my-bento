import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { GetPermissionsQuery } from './GetPermissionsQuery';
import { GetPermissionsResponse } from './GetPermissionsResponse';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsQueryHandler implements IQueryHandler {
  constructor() {} // @Inject('IPermissionRepository') private readonly repository: IPermissionRepository

  public async execute(query: GetPermissionsQuery): Promise<GetPermissionsResponse[]> {
    const tenantId = new Id(query.tenantId);

    // const permissions = await this.findPermissions(tenantId);

    // const permissionsResponse = permissions.map(permission => {
    //   return GetPermissionsResponse.fromDomain(permission);
    // });

    // return permissionsResponse;

    throw new Error();
  }

  // private async findPermissions(tenantId: ID): Promise<Permission[]> {
  //   const filter = PermissionFilter.create().withTenantId(tenantId);

  //   const result = await this.repository.find(filter);

  //   return result.unwrap();
  // }
}
