import CreateProductUseCases from './create.product.usecases';

const input = {
  name: 'Product1',
  price: 1000,
};

const ProductMockRepository = () => {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use cases', () => {
  it('should be able create a product', async () => {
    const productRepository = ProductMockRepository();
    const createProductUseCases = new CreateProductUseCases(productRepository);

    const output = await createProductUseCases.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
