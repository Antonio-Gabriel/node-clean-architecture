import Order from '../../../../domain/checkout/entity/order';
import OrderModel from '../model/order.model';
import OrderItemMapper from './order-item-mapper';
import OrderMapper from './order-mapper';

export default class OrderMapperImplementation implements OrderMapper {
  private _itemMapper: OrderItemMapper;

  constructor(itemMapper: OrderItemMapper) {
    this._itemMapper = itemMapper;
  }

  toEntity({ id, customer_id, items }: OrderModel): Order {
    return new Order(
      id,
      customer_id,
      items.map((item) => this._itemMapper.toEntity(item))
    );
  }

  toModel(entity: Order) {
    return {
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => {
        const itemModel = this._itemMapper.toModel(item);
        itemModel.order_id = entity.id;
        return itemModel;
      }),
    };
  }
}
