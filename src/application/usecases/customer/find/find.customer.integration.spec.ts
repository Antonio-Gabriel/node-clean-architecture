import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import CustomerMapper from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper';
import CustomerMapperImplementation from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper-implementation';
import CustomerModel from '../../../../infrastructure/customer/sequelize/model/customer.model';
import CustomerRepository from '../../../../infrastructure/customer/sequelize/repository/customer.repository';
import FindCustomerUseCase from './find.customer.usecase';

describe('Integration Test find customer use case', () => {
  const mapper: CustomerMapper = new CustomerMapperImplementation();
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer ', async () => {
    const customerRepository = new CustomerRepository(mapper);

    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer('123', 'John');
    const address = new Address('Street', 123, 'Zip', 'City');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'John',
      address: {
        street: 'Street',
        city: 'City',
        number: 123,
        zip: 'Zip',
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
