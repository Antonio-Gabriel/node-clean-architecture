import { Sequelize } from 'sequelize-typescript';
import Product from '../../../../domain/product/entity/product';
import ProductMapper from '../../../../infrastructure/product/sequelize/mapper/product-mapper';
import ProductMapperImplementation from '../../../../infrastructure/product/sequelize/mapper/product-mapper-implementation';
import ProductModel from '../../../../infrastructure/product/sequelize/model/product.model';
import ProductRepository from '../../../../infrastructure/product/sequelize/repository/product.repository';
import FindProductUseCases from '../find/find.product.usecases';
import UpdateProductUseCases from './update.product.usecases';

describe('Integration test update product use cases', () => {
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

  it('should be able update a product', async () => {
    const productRepository = new ProductRepository(mapper);
    const updateProductUseCases = new UpdateProductUseCases(productRepository);

    const product = new Product('123', 'Product1', 1000);

    await productRepository.create(product);

    const input = {
      id: '123',
      name: 'computer Updated',
      price: 6000,
    };

    const output = {
      id: '123',
      name: 'computer Updated',
      price: 6000,
    };

    const result = await updateProductUseCases.execute(input);

    expect(result).toEqual(output);

    const findProductUseCases = new FindProductUseCases(productRepository);

    const result2 = await findProductUseCases.execute({ id: '123' });

    expect(result2).toEqual(output);
  });
});
