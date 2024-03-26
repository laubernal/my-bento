import { IQuery } from '@nestjs/cqrs';

export class GetRoleQuery implements IQuery {
  constructor(private readonly _id: string) {}

  get id(): string {
    return this._id;
  }
}
