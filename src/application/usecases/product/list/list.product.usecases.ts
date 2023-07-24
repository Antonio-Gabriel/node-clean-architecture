import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';

import { OutputListProductDto } from './list.product.dto';

export default class ListProductUseCases {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map(({ id, name, price }) => ({
        id,
        name,
        price,
      })),
    };
  }
}
