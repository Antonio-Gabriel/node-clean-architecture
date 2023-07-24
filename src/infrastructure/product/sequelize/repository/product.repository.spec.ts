import { Sequelize } from 'sequelize-typescript';
import Product from '../../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';
import ProductMapper from '../mapper/product-mapper';
import ProductMapperImplementation from '../mapper/product-mapper-implementation';
import ProductModel from '../model/product.model';
import ProductRepository from './product.repository';

describe('Product repository test', () => {
  const mapper: ProductMapper = new ProductMapperImplementation();

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository: ProductRepositoryInterface = new ProductRepository(
      mapper
    );
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });
  });

  it('should update a product', async () => {
    const productRepository: ProductRepositoryInterface = new ProductRepository(
      mapper
    );
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });

    product.changeName('Product 2');
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200,
    });
  });

  it('should find a product', async () => {
    const productRepository: ProductRepositoryInterface = new ProductRepository(
      mapper
    );
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    const foundProduct = await productRepository.findById('1');

    const { id, name, price } = foundProduct;

    expect(productModel.toJSON()).toStrictEqual({
      id,
      name,
      price,
    });
  });

  it('should find all product', async () => {
    const productRepository: ProductRepositoryInterface = new ProductRepository(
      mapper
    );
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const product2 = new Product('2', 'Product 2', 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  });
});
