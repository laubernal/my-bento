import { DomainEvent } from '../Entities/DomainEvent';

export interface IDomainEventHandler {
  handle(event: DomainEvent): Promise<void>;
}
