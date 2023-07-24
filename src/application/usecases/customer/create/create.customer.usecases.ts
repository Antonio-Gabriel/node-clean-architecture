import CustomerFactory from '../../../../domain/customer/factory/customer.factory';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../../domain/customer/value-object/address';
import {
  InputCreateCustomerDto,
  OutputCreateCustomerDto,
} from './create.customer.dto';

export default class CreateCustomerUseCases {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto> {
    const { name, address } = input;

    const customer = CustomerFactory.createWithAddress(
      name,
      new Address(address.street, address.number, address.zip, address.city)
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}
