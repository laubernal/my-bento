import { ValueObject } from './ValueObject';
import { ArrayUtils } from "../Helper/Array.utils";

export class Password extends ValueObject {
  private readonly password: string;

  constructor(password: string) {
    super();
    this.password = password;
  }

  public get value(): string {
    return this.password;
  }

  protected validate(): boolean {
    return true;
  }

  public static generate(): Password {
    const words = [ "bakasta", "noelle", "yami", "vanessa", "yuno", "julius", "draken", "mikey", "baji", "chifuyu" ];
    const chars = "!@#$%^&*0123456789";

    const randomIndex = Math.floor(Math.random() * words.length);

    const basePassword = words[randomIndex];

    const passwordSlug: string[] = [];

    ArrayUtils.times<void>(5, () => {
      const randomNumber = Math.floor(Math.random() * chars.length);

      passwordSlug.push(chars.split('')[randomNumber]);
    })

    const password = basePassword.concat(...passwordSlug);

    return new Password(password);
  }
}
