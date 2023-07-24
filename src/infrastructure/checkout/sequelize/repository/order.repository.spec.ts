import { Sequelize } from 'sequelize-typescript';

import OrderRepository from './order.repository';
import OrderModel from '../model/order.model';

import OrderItemModel from '../model/order-item.model';
import CustomerRepository from '../../../customer/sequelize/repository/customer.repository';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import ProductRepository from '../../../product/sequelize/repository/product.repository';
import Product from '../../../../domain/product/entity/product';
import OrderItem from '../../../../domain/checkout/entity/order-item';
import Order from '../../../../domain/checkout/entity/order';
import CustomerModel from '../../../customer/sequelize/model/customer.model';
import ProductModel from '../../../product/sequelize/model/product.model';
import OrderItemMapperImplementation from '../mapper/order-item-mapper-implementation';
import OrderMapperImplementation from '../mapper/order-mapper-implementation';
import CustomerMapperImplementation from '../../../customer/sequelize/mapper/customer-mapper-implementation';
import ProductMapperImplementation from '../../../product/sequelize/mapper/product-mapper-implementation';
import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';

describe('Order repository test', () => {
  const orderItemMapper = new OrderItemMapperImplementation();
  const orderMapper = new OrderMapperImplementation(orderItemMapper);
  const customerMapper = new CustomerMapperImplementation();
  const productMapper = new ProductMapperImplementation();

  let sequelize: Sequelize;
  let orderRepository: OrderRepository;

  const productRepository: ProductRepositoryInterface = new ProductRepository(
    productMapper
  );

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();

    const customerRepository = new CustomerRepository(customerMapper);
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.Address = address;
    await customerRepository.create(customer);

    orderRepository = new OrderRepository(sequelize, orderMapper);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    });
  });

  it('should be able update a order', async () => {
    const product1 = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);
    const product3 = new Product('3', 'Product 3', 30);
    const product4 = new Product('4', 'Product 4', 40);

    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);
    await productRepository.create(product4);

    const orderItem1 = convertProductToItem(product1, '1', 2);
    const orderItem2 = convertProductToItem(product2, '2', 4);
    const orderItem3 = convertProductToItem(product3, '3', 6);
    const orderItem4 = convertProductToItem(product4, '4', 6);

    const order = new Order('123', '123', [orderItem1, orderItem2, orderItem3]);

    await orderRepository.create(order);

    const updatedOrderItem2 = convertProductToItem(product2, '2', 50);

    const updatedOrder = new Order('123', '123', [
      updatedOrderItem2,
      orderItem3,
      orderItem4,
    ]);

    await orderRepository.update(updatedOrder);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: updatedOrder.total(),
      items: [
        {
          id: updatedOrderItem2.id,
          name: updatedOrderItem2.name,
          price: updatedOrderItem2.price,
          quantity: updatedOrderItem2.quantity,
          order_id: '123',
          product_id: '2',
        },
        {
          id: orderItem3.id,
          name: orderItem3.name,
          price: orderItem3.price,
          quantity: orderItem3.quantity,
          order_id: '123',
          product_id: '3',
        },
        {
          id: orderItem4.id,
          name: orderItem4.name,
          price: orderItem4.price,
          quantity: orderItem4.quantity,
          order_id: '123',
          product_id: '4',
        },
      ],
    });
  });

  it('should be able find a order', async () => {
    const product = new Product('123', 'Product 1', 100);
    await productRepository.create(product);
    const orderItem = convertProductToItem(product, '1', 2);
    const order = new Order('123', '123', [orderItem]);

    await orderRepository.create(order);

    const foundOrder = await orderRepository.findById('123');
    expect(order).toStrictEqual(foundOrder);
  });

  it('should be able find all orders', async () => {
    const product1 = new Product('1', 'Product 1', 10);
    const product2 = new Product('2', 'Product 2', 20);
    const product3 = new Product('3', 'Product 3', 30);
    const product4 = new Product('4', 'Product 4', 40);
    const product5 = new Product('5', 'Product 5', 50);

    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);
    await productRepository.create(product4);
    await productRepository.create(product5);

    const orderItem1 = convertProductToItem(product1, '1', 2);
    const orderItem2 = convertProductToItem(product2, '2', 4);
    const orderItem3 = convertProductToItem(product3, '3', 6);
    const orderItem4 = convertProductToItem(product4, '4', 6);
    const orderItem5 = convertProductToItem(product5, '5', 12);

    const order1 = new Order('123', '123', [orderItem1, orderItem2]);
    const order2 = new Order('456', '123', [orderItem3]);
    const order3 = new Order('789', '123', [orderItem4, orderItem5]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);
    await orderRepository.create(order3);

    const foundOrders = await orderRepository.findAll();
    expect([order1, order2, order3]).toStrictEqual(foundOrders);

  });

  function convertProductToItem(
    product: Product,
    itemId: string,
    itemQuantity: number
  ): OrderItem {
    return new OrderItem(
      itemId,
      product.name,
      product.price,
      product.id,
      itemQuantity
    );
  }
});
