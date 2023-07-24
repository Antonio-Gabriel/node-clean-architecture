import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from './update.product.dto';

export default class UpdateProductUseCases {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const { id, name, price } = input;
    const product = await this.productRepository.findById(id);
    product.changeName(name), product.changePrice(price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
