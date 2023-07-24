import { Sequelize } from 'sequelize-typescript';

import Product from '../../../../domain/product/entity/product';
import ProductMapper from '../../../../infrastructure/product/sequelize/mapper/product-mapper';
import ProductMapperImplementation from '../../../../infrastructure/product/sequelize/mapper/product-mapper-implementation';
import ProductModel from '../../../../infrastructure/product/sequelize/model/product.model';
import ProductRepository from '../../../../infrastructure/product/sequelize/repository/product.repository';
import CreateProductUseCases from './create.product.usecases';

describe('Integration test create product use cases', () => {
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

  it('should be able create product use cases', async () => {
    const productRepository = new ProductRepository(mapper);
    const createProductUseCases = new CreateProductUseCases(productRepository);

    const product = new Product('123', 'Product1', 1000);

    await productRepository.create(product);

    const input = {
      name: 'Product1',
      price: 1000,
    };

    const result = await createProductUseCases.execute(input);

    const output = {
      id: result.id,
      name: 'Product1',
      price: 1000,
    };

    expect(result).toEqual(output);
  });
});
