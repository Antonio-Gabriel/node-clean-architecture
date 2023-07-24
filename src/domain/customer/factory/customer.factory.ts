import { randomUUID } from 'node:crypto';

import Customer from '../entity/customer';
import Address from '../value-object/address';

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(randomUUID(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(randomUUID(), name);
    customer.changeAddress(address);
    return customer;
  }
}
