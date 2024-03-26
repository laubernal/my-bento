import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SignInQuery } from 'Authorization/Auth/Application/SignIn/SignInQuery';
import { SignInResponse } from 'Authorization/Auth/Application/SignIn/SignInResponse';
import { Auth } from 'Authorization/Auth/Domain/Entity/Auth';
import { AuthFilter } from 'Authorization/Auth/Domain/Filter/AuthFilter';
import { IAuthRepository } from 'Authorization/Auth/Domain/Repository/IAuthRepository';
import { Email } from 'Shared/Domain/Vo/Email.vo';
import { Password } from 'Shared/Domain/Vo/Password.vo';

@QueryHandler(SignInQuery)
export class SignInQueryHandler implements IQueryHandler {
  // constructor(@Inject('IAuthRepository') private readonly repository: IAuthRepository,) {}

  public async execute(query: SignInQuery): Promise<SignInResponse> {
    const email = new Email(query.email);
    const password = new Password(query.password);

    // const auth = await this.findUser(email);

    // await auth.checkIsAValidPassword(password);

    // return SignInResponse.fromDomain(auth);
    throw new Error();
  }

  // private async findUser(email: Email): Promise<Auth> {
  //   const filter = new AuthFilter();

  //   filter.withEmail(email);

  // const result = await this.repository.findOne(filter);

  // return result.unwrap();
  // }
}
