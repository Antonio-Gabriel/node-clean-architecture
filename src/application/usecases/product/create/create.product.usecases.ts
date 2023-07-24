import Product from '../../../../domain/product/entity/product';
import ProductFactory from '../../../../domain/product/factory/product.factory';
import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from './create.product.dto';

export default class CreateProductUseCases {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create('a', input.name, input.price);

    await this.productRepository.create(product as Product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
