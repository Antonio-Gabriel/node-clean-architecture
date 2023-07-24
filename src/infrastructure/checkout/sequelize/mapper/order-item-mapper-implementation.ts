import OrderItem from '../../../../domain/checkout/entity/order-item';
import orderItemModel from '../model/order-item.model';

import OrderItemMapper from './order-item-mapper';

export default class OrderItemMapperImplementation implements OrderItemMapper {
  toEntity({
    id,
    name,
    price,
    product_id,
    quantity,
  }: orderItemModel): OrderItem {
    return new OrderItem(id, name, price, product_id, quantity);
  }
  toModel(entity: OrderItem): any {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
      product_id: entity.productId,
      quantity: entity.quantity,
    };
  }
}
