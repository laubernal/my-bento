import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { NotAllowedError } from 'Authorization/Permission/Domain/Error/NotAllowedError';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { CheckPermissionQuery } from './CheckPermissionQuery';
import { CheckPermissionResponse } from './CheckPermissionResponse';

@QueryHandler(CheckPermissionQuery)
export class CheckPermissionQueryHandler implements IQueryHandler {
  constructor() {} // @Inject('IPermissionRepository') private readonly repository: IPermissionRepository

  public async execute(query: CheckPermissionQuery): Promise<CheckPermissionResponse> {
    try {
      const tenantId = new Id(query.tenantId);
      const moduleId = new Id(query.moduleId);

      // const permission = await this.findPermission(tenantId, moduleId);

      // return CheckPermissionResponse.fromDomain(permission);
      throw new Error();
    } catch (error: any) {
      throw new NotAllowedError(`Not Allowed in ${query.moduleName}`);
    }
  }

  // private async findPermission(tenantId: ID, moduleId: ID): Promise<Permission> {
  //   const filter = PermissionFilter.create().withTenantId(tenantId).withModuleId(moduleId);

  //   const result = await this.repository.findOne(filter);

  //   return result.unwrap();
  // }
}
