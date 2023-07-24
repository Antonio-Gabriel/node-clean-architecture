import { Sequelize } from 'sequelize-typescript';
import Product from '../../../../domain/product/entity/product';
import ProductMapper from '../../../../infrastructure/product/sequelize/mapper/product-mapper';
import ProductMapperImplementation from '../../../../infrastructure/product/sequelize/mapper/product-mapper-implementation';
import ProductModel from '../../../../infrastructure/product/sequelize/model/product.model';
import ProductRepository from '../../../../infrastructure/product/sequelize/repository/product.repository';
import FindProductUseCases from './find.product.usecases';

describe('Integration test find product use cases', () => {
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

  it('should be able find by id a product', async () => {
    const productRepository = new ProductRepository(mapper);
    const findProductUseCases = new FindProductUseCases(productRepository);

    const product = new Product('123', 'Computer', 2000);

    await productRepository.create(product);

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
