import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Role } from 'Authorization/Auth/Domain/Entity/Role';
import { RoleFilter } from 'Authorization/Auth/Domain/Filter/RoleFilter';
import { IRoleRepository } from 'Authorization/Auth/Domain/Repository/IRoleRepository';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { GetRoleQuery } from './GetRoleQuery';
import { GetRoleResponse } from './GetRoleResponse';

@QueryHandler(GetRoleQuery)
export class GetRoleQueryHandler implements IQueryHandler {
  constructor() {} // @Inject('') private readonly repository: IRoleRepository

  public async execute(query: GetRoleQuery): Promise<GetRoleResponse> {
    const roleId = new Id(query.id);

    // const role = await this.findRole(roleId);

    // return GetRoleResponse.fromDomain(role);
    throw new Error();
  }

  // private async findRole(roleId: ID): Promise<Role> {
  //   const filter = RoleFilter.builder().withRoleId(roleId);

  //   const result = await this.repository.findOne(filter);

  //   return result.unwrap();
  // }
}
