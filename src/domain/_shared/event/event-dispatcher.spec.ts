import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/event/product-created.events';
import Event, { EventDataType } from './event';
import EventDispatcher from './event-dispatcher';
import EventDispatcherInterface from './event-dispatcher.interface';
import EventHandlerInterface from './event-handler.interface';

class EventDispatcherTest extends Event<EventDataType> {
  constructor(eventData: any) {
    super(eventData);
  }
}

describe('Domain events tests', () => {
  const eventDispatcher: EventDispatcherInterface = new EventDispatcher();
  const event: Event<EventDataType> = new EventDispatcherTest({
    name: 'Test 1',
  });

  it('should be able register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      1
    );

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);
  });

  it('should be able unregister an event handler', async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(
      0
    );
  });

  it('should be able unregister all event handler', async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent']
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10.0,
    });

    // Quando o notify for executado SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it('should unregister an event handler', () => {
    const eventHandler1: EventHandlerInterface<EventDispatcherTest> = {
      handle: () => {},
    };
    const eventHandler2: EventHandlerInterface<EventDispatcherTest> = {
      handle: () => {},
    };
    const eventHandler3: EventHandlerInterface<EventDispatcherTest> = {
      handle: () => {},
    };
    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');
    const spyEventHandler3 = jest.spyOn(eventHandler3, 'handle');

    eventDispatcher.register('TestEvent', eventHandler1);
    eventDispatcher.register('TestEvent', eventHandler2);
    eventDispatcher.register('TestEvent', eventHandler3);

    eventDispatcher.unregisterAll();

    eventDispatcher.notify(event);

    expect(spyEventHandler1).toBeCalledTimes(0);
    expect(spyEventHandler2).toBeCalledTimes(0);
    expect(spyEventHandler3).toBeCalledTimes(0);
  });

  it('should unregister an event handler', () => {
    const eventHandler1: EventHandlerInterface<EventDispatcherTest> = {
      handle: () => {},
    };
    const eventHandler2: EventHandlerInterface<EventDispatcherTest> = {
      handle: () => {},
    };
    const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
    const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register('EventDispatcherTest', eventHandler1);
    eventDispatcher.register('EventDispatcherTest', eventHandler2);

    eventDispatcher.unregister('EventDispatcherTest', eventHandler1);

    eventDispatcher.notify(event);

    expect(spyEventHandler1).toBeCalledTimes(0);
    expect(spyEventHandler2).toBeCalledTimes(1);
  });
});
