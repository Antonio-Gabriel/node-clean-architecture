import Order from '../../../../domain/checkout/entity/order';
import Mapper from '../../../shared/mapper/mapper';
import OrderModel from '../model/order.model';

export default interface OrderMapper extends Mapper<Order, OrderModel> {}

