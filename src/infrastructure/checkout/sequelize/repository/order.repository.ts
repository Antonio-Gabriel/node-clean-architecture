import { Sequelize } from 'sequelize';
import Order from '../../../../domain/checkout/entity/order';
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';
import OrderMapper from '../mapper/order-mapper';
import OrderItemModel from '../model/order-item.model';
import OrderModel from '../model/order.model';

type Delta<T> = {
  added: T[];
  changed: T[];
  deleted: T[];
};

export default class OrderRepository implements OrderRepositoryInterface {
  private _mapper: OrderMapper;
  private _sequelize: Sequelize;

  constructor(sequelize: Sequelize, orderMapper: OrderMapper) {
    this._mapper = orderMapper;
    this._sequelize = sequelize;
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(this._mapper.toModel(entity), {
      include: [{ model: OrderItemModel }],
    });
  }

  async update(entity: Order): Promise<void> {
    const orderModel = this._mapper.toModel(entity);

    const order = await OrderModel.findOne({
      where: { id: entity.id },
      include: ['items'],
    });
    if (!order) {
      throw new Error('Order not found');
    }

    const itemDelta = this.getDelta(order.items, orderModel.items);

    await this._sequelize.transaction(async (transaction) => {
      await Promise.all([
        itemDelta.added.map(async (item) => {
          await order.$create('item', item, { transaction });
        }),
        itemDelta.changed.map(async (item) => {
          const currentItem = order.items.find((_item) => _item.id === item.id);
          await currentItem.update(item, { transaction });
        }),
        itemDelta.deleted.map(async (item) => {
          await item.destroy({ transaction });
        }),
      ]);
      return await order.update(orderModel, { transaction });
    });
  }
  async findById(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: ['items'],
      });

      return this._mapper.toEntity(orderModel);
    } catch (error) {
      throw new Error('Order not found');
    }

    return;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: 'items' });
    return orderModels.map((order) => this._mapper.toEntity(order));
  }

  private getDelta<T extends { id: string }>(
    source: T[],
    updated: T[]
  ): Delta<T> {
    const added = updated.filter((updatedItem) =>
      source.every((sourceItem) => sourceItem.id !== updatedItem.id)
    );
    const changed = updated.filter((updatedItem) =>
      source.some((sourceItem) => sourceItem.id === updatedItem.id)
    );
    const deleted = source.filter((sourceItem) =>
      updated.every((updatedItem) => updatedItem.id !== sourceItem.id)
    );

    const delta: Delta<T> = {
      added: added,
      changed: changed,
      deleted: deleted,
    };

    return delta;
  }
}
