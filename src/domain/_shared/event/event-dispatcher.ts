import Event, { EventDataType } from './event';
import EventDispatcherInterface from './event-dispatcher.interface';
import EventHandlerInterface from './event-handler.interface';

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: {
    [eventName: string]: EventHandlerInterface<Event<EventDataType>>[];
  } = {};

  get getEventHandlers(): {
    [eventName: string]: EventHandlerInterface<Event<EventDataType>>[];
  } {
    return this.eventHandlers;
  }

  register(
    eventName: string,
    eventHandler: EventHandlerInterface<Event<EventDataType>>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<Event<EventDataType>>
  ): void {
    if (this.getEventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);

      if (index !== -1) this.eventHandlers[eventName].splice(index, 1);
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  notify(event: Event<EventDataType>): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName])
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
  }
}
