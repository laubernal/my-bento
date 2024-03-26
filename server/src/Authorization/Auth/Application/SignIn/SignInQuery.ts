import { IQuery } from "@nestjs/cqrs";
import { SignInApiRequest } from "Authorization/Auth/Infrastructure/Controller/SignIn/SignInApiRequest";

export class SignInQuery implements IQuery {
  constructor(private readonly _email: string, private readonly _password: string) {}

  public static fromJson(json: SignInApiRequest): SignInQuery {
    return new SignInQuery(json.email, json.password);
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}