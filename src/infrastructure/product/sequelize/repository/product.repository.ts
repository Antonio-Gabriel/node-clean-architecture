import Product from '../../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';
import ProductMapper from '../mapper/product-mapper';
import ProductModel from '../model/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
  private _mapper: ProductMapper;

  constructor(mapper: ProductMapper) {
    this._mapper = mapper;
  }

  async create(entity: Product): Promise<void> {
    await ProductModel.create(this._mapper.toModel(entity));
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(this._mapper.toModel(entity), {
      where: {
        id: entity.id,
      },
    });
  }

  async findById(id: string): Promise<Product> {
    try {
      const productModel = await ProductModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
      return this._mapper.toEntity(productModel);
    } catch (error) {
      throw new Error('Product not found');
    }
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map((product) => this._mapper.toEntity(product));
  }
}
