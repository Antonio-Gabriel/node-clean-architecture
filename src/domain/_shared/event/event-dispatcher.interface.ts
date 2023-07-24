import Event, { EventDataType } from './event';
import EventHandlerInterface from './event-handler.interface';

export default interface EventDispatcherInterface {
  notify(event: Event<EventDataType>): void;
  register(
    eventName: string,
    eventHandler: EventHandlerInterface<Event<EventDataType>>
  ): void;
  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<Event<EventDataType>>
  ): void;
  unregisterAll(): void;
}
