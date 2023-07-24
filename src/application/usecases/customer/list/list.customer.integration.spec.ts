import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '../../../../domain/customer/factory/customer.factory';
import Address from '../../../../domain/customer/value-object/address';
import CustomerMapper from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper';
import CustomerMapperImplementation from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper-implementation';
import CustomerModel from '../../../../infrastructure/customer/sequelize/model/customer.model';
import CustomerRepository from '../../../../infrastructure/customer/sequelize/repository/customer.repository';
import ListCustomerUseCases from './list.customer.usecases';

describe('Integration test for listing customer usecases', () => {
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

  it('should list a customer', async () => {
    const customerRepository = new CustomerRepository(mapper);
    const listCustomerUseCases = new ListCustomerUseCases(customerRepository);

    const customer1 = CustomerFactory.createWithAddress(
      'Antonio Gabriel',
      new Address('Street 1', 1, 'Zip', 'City')
    );

    const customer2 = CustomerFactory.createWithAddress(
      'Paulo Estêvão',
      new Address('Street 2', 2, 'Zip2', 'City2')
    );

    const customer3 = CustomerFactory.createWithAddress(
      'Marcia Gaieta',
      new Address('Street 3', 3, 'Zip3', 'City3')
    );

    const customer4 = CustomerFactory.createWithAddress(
      'Jorge Neto',
      new Address('Street 4', 4, '1234', 'City4')
    );

    const customer5 = CustomerFactory.createWithAddress(
      'Wilson',
      new Address('Street 5', 5, '1234', 'City5')
    );

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);
    await customerRepository.create(customer3);
    await customerRepository.create(customer4);
    await customerRepository.create(customer5);

    const output = {
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.Address.street,
            number: customer1.Address.number,
            zip: customer1.Address.zip,
            city: customer1.Address.city,
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.Address.street,
            number: customer2.Address.number,
            zip: customer2.Address.zip,
            city: customer2.Address.city,
          },
        },
        {
          id: customer3.id,
          name: customer3.name,
          address: {
            street: customer3.Address.street,
            number: customer3.Address.number,
            zip: customer3.Address.zip,
            city: customer3.Address.city,
          },
        },
        {
          id: customer4.id,
          name: customer4.name,
          address: {
            street: customer4.Address.street,
            number: customer4.Address.number,
            zip: customer4.Address.zip,
            city: customer4.Address.city,
          },
        },
        {
          id: customer5.id,
          name: customer5.name,
          address: {
            street: customer5.Address.street,
            number: customer5.Address.number,
            zip: customer5.Address.zip,
            city: customer5.Address.city,
          },
        },
      ],
    };

    const result = await listCustomerUseCases.execute();

    expect(result).toEqual(output);
  });
});
