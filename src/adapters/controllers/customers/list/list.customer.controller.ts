import { Request, Response } from 'express';
import ListCustomerUseCases from '../../../../application/usecases/customer/list/list.customer.usecases';
import CustomerMapper from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper';
import CustomerMapperImplementation from '../../../../infrastructure/customer/sequelize/mapper/customer-mapper-implementation';
import CustomerRepository from '../../../../infrastructure/customer/sequelize/repository/customer.repository';
import CustomerPresenter from '../../../presenters/customer.presenters';

export default class ListCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const mapper: CustomerMapper = new CustomerMapperImplementation();
    const customerRepository = new CustomerRepository(mapper);

    const listCustomerUseCase = new ListCustomerUseCases(customerRepository);

    const output = await listCustomerUseCase.execute();

    return response.format({
      json: async () => response.send(output),
      xml: async () => response.send(CustomerPresenter.listXML(output)),
    });
  }
}
