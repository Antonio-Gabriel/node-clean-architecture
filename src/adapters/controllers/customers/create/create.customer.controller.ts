import { Request, Response } from 'express';
import CreateCustomerUseCases from '../../../../application/usecases/customer/create/create.customer.usecases';
import CustomerMapper from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper';
import CustomerMapperImplementation from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper-implementation';
import CustomerRepository from '../../../../infrastructure/customer/sequelize/repository/customer.repository';

export default class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, address } = request.body;
    const { street, number, zip, city } = address;

    const mapper: CustomerMapper = new CustomerMapperImplementation();
    const customerRepository = new CustomerRepository(mapper);
    const createCustomerUseCase = new CreateCustomerUseCases(
      customerRepository
    );

    try {
      const output = await createCustomerUseCase.execute({
        name,
        address: {
          street,
          number,
          zip,
          city,
        },
      });

      return response.send(output);
    } catch (err) {
      return response.status(500).send(err);
    }
  }
}
