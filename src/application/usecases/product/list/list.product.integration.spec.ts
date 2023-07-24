import { Sequelize } from 'sequelize-typescript';
import Product from '../../../../domain/product/entity/product';
import ProductMapper from '../../../../infrastructure/product/sequelize/mapper/product-mapper';
import ProductMapperImplementation from '../../../../infrastructure/product/sequelize/mapper/product-mapper-implementation';
import ProductModel from '../../../../infrastructure/product/sequelize/model/product.model';
import ProductRepository from '../../../../infrastructure/product/sequelize/repository/product.repository';
import ListProductUseCases from './list.product.usecases';

describe('Integration test for listing products usecases', () => {
  const mapper: ProductMapper = new ProductMapperImplementation();
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should list products', async () => {
    const productRepository = new ProductRepository(mapper);
    const listProductUseCases = new ListProductUseCases(productRepository);

    const product1 = new Product('123', 'computer1', 1600);
    const product2 = new Product('1234', 'computer2', 3600);
    const product3 = new Product('12345', 'computer3', 4600);

    await productRepository.create(product1);
    await productRepository.create(product2);
    await productRepository.create(product3);

    const output = {
      products: [
        {
          id: '123',
          name: 'computer1',
          price: 1600,
        },
        {
          id: '1234',
          name: 'computer2',
          price: 3600,
        },
        {
          id: '12345',
          name: 'computer3',
          price: 4600,
        },
      ],
    };

    const result = await listProductUseCases.execute();

    expect(result).toEqual(output);
  });
});
