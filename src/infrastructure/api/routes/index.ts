import { Router } from 'express';
import { customerRoute } from './customer.route';
import { productRoute } from './product.route';

const router = Router();

router.use('/customer', customerRoute);
router.use('/product', productRoute);


export { router };
