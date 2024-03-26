import { StringVo } from "Shared/Domain/Vo/String.vo";

export class Name extends StringVo {
  constructor(name: string) {
    super(name);
  }
}