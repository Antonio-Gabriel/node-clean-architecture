import { Request, Response } from 'express';
import ListProductUseCases from '../../../../application/usecases/product/list/list.product.usecases';
import ProductMapper from '../../../../infrastructure/product/sequelize/mapper/product-mapper';
import ProductMapperImplementation from '../../../../infrastructure/product/sequelize/mapper/product-mapper-implementation';
import ProductRepository from '../../../../infrastructure/product/sequelize/repository/product.repository';

export default class ListProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const mapper: ProductMapper = new ProductMapperImplementation();

    const productRepository = new ProductRepository(mapper);
    const listProductUseCases = new ListProductUseCases(productRepository);

    try {
      const output = await listProductUseCases.execute();
      return response.send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
