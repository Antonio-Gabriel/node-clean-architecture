import EventHandlerInterface from '../../../_shared/event/event-handler.interface';
import CustomerAddressUpdatedEvents from '../customer-address-updated-events';

export default class SendLogWhenCustomerAndChangeAddressIsUpdatedHandler
  implements EventHandlerInterface<CustomerAddressUpdatedEvents>
{
  public handle({ eventData }: CustomerAddressUpdatedEvents): void {
    const { id, name, address } = eventData;
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`
    );
  }
}
