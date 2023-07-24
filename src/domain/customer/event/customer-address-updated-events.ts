import Event, { EventDataType } from '../../_shared/event/event';
import Address from '../value-object/address';

interface CustomerAddressUpdatedEventsInterface extends EventDataType {
  id: string;
  name: string;
  address: Address;
}

export default class CustomerAddressUpdatedEvents extends Event<CustomerAddressUpdatedEventsInterface> {
  constructor(eventData: CustomerAddressUpdatedEventsInterface) {
    super(eventData);
  }
}
