import { EventBus } from '@nestjs/cqrs';

export class AppEventBus {
  private static _instance: EventBus;

  private constructor() {}

  public static instance(eventBus?: EventBus) {
    if (AppEventBus._instance) {
      return AppEventBus._instance;
    }

    if (!eventBus) {
      throw new Error('You need a nest event bus instance to initialize the class');
    }

    AppEventBus._instance = eventBus;
  }
}
