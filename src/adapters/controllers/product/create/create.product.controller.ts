import { Request, Response } from 'express';
import CreateProductUseCases from '../../../../application/usecases/product/create/create.product.usecases';
import ProductMapper from '../../../../infrastructure/product/sequelize/mapper/product-mapper';
import ProductMapperImplementation from '../../../../infrastructure/product/sequelize/mapper/product-mapper-implementation';
import ProductRepository from '../../../../infrastructure/product/sequelize/repository/product.repository';

export default class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, price } = request.body;

    const mapper: ProductMapper = new ProductMapperImplementation();

    const productRepository = new ProductRepository(mapper);
    const createProductUseCases = new CreateProductUseCases(productRepository);

    try {
      const output = await createProductUseCases.execute({ name, price });

      return response.send(output);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
