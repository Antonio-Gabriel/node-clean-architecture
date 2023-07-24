import OrderItem from '../../../../domain/checkout/entity/order-item';
import Mapper from '../../../shared/mapper/mapper';
import OrderItemModel from '../model/order-item.model';

export default interface OrderItemMapper
  extends Mapper<OrderItem, OrderItemModel> {}
