import EventHandlerInterface from '../../../_shared/event/event-handler.interface';
import CustomerCreatedEvent from '../customer-created-events';

export default class SendLogWhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  public handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}
