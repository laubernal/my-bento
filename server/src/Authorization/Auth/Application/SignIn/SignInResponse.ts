import { Auth } from 'Authorization/Auth/Domain/Entity/Auth';

export class SignInResponse {
  public static fromDomain(auth: Auth): SignInResponse {
    return new SignInResponse(
      auth.id().value,
      auth.name().value,
      auth.email().value,
      auth.roleId().value
    );
  }

  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly roleId: string
  ) {}
}
