import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

export class CryptoService {
  private scryptAsync = promisify(scrypt);
  public async hash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf = (await this.scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}-${salt}`;
  }

  public async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('-');
    const buf = (await this.scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
