import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { GetPermissionsQuery } from 'Authorization/Permission/Application/GetPermissions/GetPermissionsQuery';
import { GetPermissionsResponse } from 'Authorization/Permission/Application/GetPermissions/GetPermissionsResponse';
import { SignInQuery } from 'Authorization/Auth/Application/SignIn/SignInQuery';
import { SignInResponse } from 'Authorization/Auth/Application/SignIn/SignInResponse';
import { SignInApiRequest } from 'Authorization/Auth/Infrastructure/Controller/SignIn/SignInApiRequest';
import jwt from 'jsonwebtoken';
import { GetRoleQuery } from 'Authorization/Auth/Application/GetRole/GetRoleQuery';
import { GetRoleResponse } from 'Authorization/Auth/Application/GetRole/GetRoleResponse';

@Controller()
export class SignInController {
  constructor(private readonly queryBus: QueryBus, private readonly config: ConfigService) {}

  @Post('/signin')
  @UseInterceptors(ClassSerializerInterceptor)
  public async signIn(
    @Body() body: SignInApiRequest,
    @Session() session: any
  ): Promise<SignInResponse> {
    const signInQuery = SignInQuery.fromJson(body);

    const signInResponse = await this.queryBus.execute<SignInQuery, SignInResponse>(signInQuery);

    const permissionsResponse = await this.queryBus.execute<
      GetPermissionsQuery,
      GetPermissionsResponse[]
    >(new GetPermissionsQuery(signInResponse.id));

    const permissions = permissionsResponse.map(permission => {
      return { name: permission.moduleName };
    });

    const role = await this.queryBus.execute<GetRoleQuery, GetRoleResponse>(
      new GetRoleQuery(signInResponse.roleId)
    );

    session.user = jwt.sign(
      {
        name: signInResponse.name,
        email: signInResponse.email,
        permissions,
        role: role.type,
      },
      this.config.get<string>('JWT_KEY')!
    );

    return signInResponse;
  }
}
