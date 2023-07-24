import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../../domain/customer/value-object/address';
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from './update.customer.dto';

export default class UpdateCustomerUseCases {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: InputUpdateCustomerDto
  ): Promise<OutputUpdateCustomerDto> {
    const { id, name, address } = input;
    const customer = await this.customerRepository.findById(id);
    customer.changeName(name);
    customer.changeAddress(
      new Address(address.street, address.number, address.zip, address.city)
    );

    await this.customerRepository.update(customer);
    
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
