import Event, { EventDataType } from '../../_shared/event/event';

type ProductCreateInterface = {} & EventDataType;

export default class ProductCreatedEvent extends Event<ProductCreateInterface> {
  constructor(eventData: ProductCreateInterface) {
    super(eventData);
  }
}
