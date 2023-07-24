import EventHandlerInterface from '../../../_shared/event/event-handler.interface';
import CustomerCreatedEvent from '../customer-created-events';

export default class ResendLogCustomerCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  public handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}