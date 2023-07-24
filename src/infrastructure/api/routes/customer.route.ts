import { Router } from 'express';
import CreateCustomerController from '../../../adapters/controllers/customers/create/create.customer.controller';
import ListCustomerController from '../../../adapters/controllers/customers/list/list.customer.controller';

const customerRoute = Router();

const createCustomerController = new CreateCustomerController();
const listCustomerController = new ListCustomerController();

customerRoute.post('/', createCustomerController.handle);
customerRoute.get('/', listCustomerController.handle);

export { customerRoute };
