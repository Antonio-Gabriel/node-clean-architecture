import Product from './product';

describe('Product unit tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 100);
    }).toThrowError('product: Id is required');
  });

  it('Should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('123', '', 100);
    }).toThrowError('product: Name is required');
  });

  it('Should throw error when price is less than zero', () => {
    expect(() => {
      const product = new Product('123', 'Product', -1);
    }).toThrowError('product: price must be greater than 0');
  });

  it('should throw error when id and name are empty ', () => {
    expect(() => {
      const product = new Product('', '', 100);
    }).toThrowError(
      'product: Id is required,product: Name is required'
    );
  });

  it('should throw error when id and name are empty and when price is less than zero', () => {
    expect(() => {
      const product = new Product('', '', -1);
    }).toThrowError(
      'product: Id is required,product: Name is required,product: price must be greater than 0'
    );
  });

  it('Should able change name', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changeName('Product 2');

    expect(product.name).toBe('Product 2');
  });

  it('Should able change Price', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changePrice(150);

    expect(product.price).toBe(150);
  });
});
