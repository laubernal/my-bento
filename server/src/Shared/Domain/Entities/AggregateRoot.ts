import { AggregateRoot as NestAggregate, IEvent } from '@nestjs/cqrs';
import { AppEventBus } from 'Shared/Domain/Entities/AppEventBus';
import { Id } from 'Shared/Domain/Vo/Id.vo';

export abstract class AggregateRoot extends NestAggregate {
  protected constructor(
    private _id: Id,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date()
  ) {
    super();
  }

  public id(): Id {
    return this._id;
  }

  public createdAt(): Date {
    return this._createdAt;
  }

  public updatedAt(): Date {
    return this._updatedAt;
  }

  public apply<T extends IEvent = IEvent>(event: T) {
    super.apply(event);
  }

  public commit() {
    const unCommittedEvents = super.getUncommittedEvents();

    for (const event of unCommittedEvents) {
      const eventBus = AppEventBus.instance()!;

      eventBus.publish(event);
    }

    //with this line we flush domain event array on parent
    super.uncommit();
  }
}
