import Product from '../../../../domain/product/entity/product';
import Mapper from '../../../shared/mapper/mapper';
import ProductModel from '../model/product.model';

export default interface ProductMapper extends Mapper<Product, ProductModel> {}
