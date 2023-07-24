import Event, { EventDataType } from '../../_shared/event/event';

interface CustomerCreatedInterface extends EventDataType {
  id: string;
  name: string;
}

export default class CustomerCreatedEvent extends Event<CustomerCreatedInterface> {
  constructor(eventData: CustomerCreatedInterface) {
    super(eventData);
  }
}
