import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from '../model/customer.model';

import CustomerMapper from "./customer-mapper";

export default class CustomerMapperImplementation implements CustomerMapper {
  toEntity(model: CustomerModel): Customer {
    const customer = new Customer(model.id, model.name);
    const address = new Address(
      model.street,
      model.number,
      model.zipcode,
      model.city
    );
    customer.changeAddress(address);
    customer.addRewardPoints(model.rewardPoints);

    if (model.active) customer.activate();

    return customer;
  }

  toModel(entity: Customer): any {
    const address = entity.Address;
    return {
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    };
  }
}