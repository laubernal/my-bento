import { IEvent } from '@nestjs/cqrs';
import { Id } from '../Vo/Id.vo';

export abstract class DomainEvent implements IEvent {
  //<company>.<bounded-context>.<version>.<message-type>.<domain-entity>.<action>
  protected abstract readonly _type: string;
  protected abstract readonly _aggregateId: Id;

  protected readonly _dateOccurred = new Date();
  protected readonly _id: Id = Id.generate();

  public get id(): Id {
    return this._id;
  }

  public get dateOccurred(): Date {
    return this._dateOccurred;
  }
}
