import Event, { EventDataType } from './event';

export default interface EventHandlerInterface<T extends Event<EventDataType>> {
  handle(event: T): void;
}
