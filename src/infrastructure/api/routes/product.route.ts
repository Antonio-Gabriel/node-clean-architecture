import { Router } from 'express';
import CreateProductController from '../../../adapters/controllers/product/create/create.product.controller';
import ListProductController from '../../../adapters/controllers/product/list/list.product.controller';

const productRoute = Router();

const createProductController = new CreateProductController();
const listProductController = new ListProductController();

productRoute.post('/', createProductController.handle);
productRoute.get('/', listProductController.handle);

export { productRoute };
