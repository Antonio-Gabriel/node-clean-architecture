import Product from '../../../../domain/product/entity/product';
import ListProductUseCases from './list.product.usecases';

const product1 = new Product('123', 'computer1', 1600);
const product2 = new Product('1234', 'computer2', 3600);
const product3 = new Product('12345', 'computer3', 4600);

const ProductMockRepository = () => {
  return {
    findById: jest.fn(),
    findAll: jest
      .fn()
      .mockResolvedValue(Promise.resolve([product1, product2, product3])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test for listing products usecases', () => {
  it('should list products', async () => {
    const productRepository = ProductMockRepository();

    const listProductUseCases = new ListProductUseCases(productRepository);

    const output = await listProductUseCases.execute();

    expect(output.products.length).toBe(3);

    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);

    expect(output.products[2].id).toBe(product3.id);
    expect(output.products[2].name).toBe(product3.name);
    expect(output.products[2].price).toBe(product3.price);
  });
});
