import Product from '../../../../domain/product/entity/product';
import FindProductUseCases from './find.product.usecases';

const product = new Product('123', 'Computer', 2000);

const ProductMockRepository = () => {
  return {
    findById: jest.fn().mockResolvedValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test find product use case', () => {
  it('should be able find by id a product', async () => {
    const productRepository = ProductMockRepository();

    const findProductUseCases = new FindProductUseCases(productRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'Computer',
      price: 2000,
    };

    const result = await findProductUseCases.execute(input);

    expect(result).toEqual(output);
  });
});
