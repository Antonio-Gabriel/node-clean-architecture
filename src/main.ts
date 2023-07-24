import Order from './domain/checkout/entity/order';
import OrderItem from './domain/checkout/entity/order-item';
import Customer from './domain/customer/entity/customer';
import Address from './domain/customer/value-object/address';

let customer = new Customer('124', 'Herlander Bento');
const address = new Address('Rua Santa Isabel II', 2, '1234-678', 'Luanda');

customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10, '1', 3);
const item2 = new OrderItem('2', 'Item 2', 15, '4', 3);

const order = new Order('1', '123', [item1, item2]);
