import ProductFactory from '../../../../domain/product/factory/product.factory';
import UpdateProductUseCases from './update.product.usecases';

const product = ProductFactory.create('a', 'Product1', 4000);

const input = {
  id: product.id,
  name: 'Computer',
  price: 1500,
};

const ProductMockRepository = () => {
  return {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe('Unit test for product update use case', () => {
  it('should be able update a product', async () => {
    const productRepository = ProductMockRepository();
    const updateProductUseCases = new UpdateProductUseCases(productRepository);

    const output = await updateProductUseCases.execute(input);

    expect(output).toEqual(input);
  });
});
