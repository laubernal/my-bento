import { NotAuthorizedError } from 'Authorization/Auth/Domain/Error/NotAuthorizedError';
import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { CryptoService } from 'Shared/Domain/Services/CryptoService';
import { Email } from 'Shared/Domain/Vo/Email.vo';
import { Id } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Password } from 'Shared/Domain/Vo/Password.vo';

export class Auth extends AggregateRoot {
  private _crypto: CryptoService = new CryptoService();

  public static build(name: Name, email: Email, password: Password, roleId: Id): Auth {
    return new Auth(Id.generate(), name, email, password, roleId);
  }

  constructor(
    _id: Id,
    private _name: Name,
    private _email: Email,
    private _password: Password,
    private _roleId: Id
  ) {
    super(_id);
  }

  public async checkIsAValidPassword(supplied: Password): Promise<void> {
    const valid = await this._crypto.compare(this._password.value, supplied.value);

    if (!valid) {
      throw new NotAuthorizedError();
    }
  }

  public crypto(): CryptoService {
    return this._crypto;
  }

  public name(): Name {
    return this._name;
  }

  public email(): Email {
    return this._email;
  }

  public password(): Password {
    return this._password;
  }

  public roleId(): Id {
    return this._roleId;
  }
}
