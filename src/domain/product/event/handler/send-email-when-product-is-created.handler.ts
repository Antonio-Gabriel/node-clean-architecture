import EventHandlerInterface from '../../../_shared/event/event-handler.interface';
import ProductCreatedEvent from '../product-created.events';

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log('Sending email to ...');
  }
}
