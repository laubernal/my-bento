import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetPermissionsQueryHandler } from 'Authorization/Permission/Application/GetPermissions/GetPermissionsQueryHandler';
import { SignInQueryHandler } from 'Authorization/Auth/Application/SignIn/SignInQueryHandler';
import { SignInController } from 'Authorization/Auth/Infrastructure/Controller/SignIn/SignInController';
import { PgAuthMapper } from 'Authorization/Auth/Infrastructure/Persistance/Mapper/PgAuthMapper';
import { PgRoleMapper } from 'Authorization/Auth/Infrastructure/Persistance/Mapper/PgRoleMapper';
import { CryptoService } from 'Shared/Domain/Services/CryptoService';
import { GetPermissionsController } from '../../../Permission/Infrastructure/Controller/GetPermissions/GetPermissionsController';
import { PgPermissionMapper } from 'Authorization/Permission/Infrastructure/Persistance/Mapper/PgPermissionMapper';
import { GetRoleQueryHandler } from 'Authorization/Auth/Application/GetRole/GetRoleQueryHandler';

const Services = [CryptoService];

// const Repositories = [
// {
//   provide: 'IAuthRepository',
//   useClass: PgAuthRepository,
// },
// {
//   provide: 'IRoleRepository',
//   useClass: PgRoleRepository,
// },
// {
//   provide: 'IPermissionRepository',
//   useClass: PgPermissionRepository,
// },
// ];

const Controllers = [SignInController, GetPermissionsController];

const Handlers = [SignInQueryHandler, GetPermissionsQueryHandler, GetRoleQueryHandler];

const Mappers = [PgAuthMapper, PgRoleMapper, PgPermissionMapper];

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [
    // ...Repositories,
    ...Handlers,
    ...Services,
    ...Mappers,
  ],
  exports: [],
})
export class AuthorizationBoundedContext {}
