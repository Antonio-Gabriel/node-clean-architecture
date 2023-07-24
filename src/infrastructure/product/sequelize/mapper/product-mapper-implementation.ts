import Product from "../../../../domain/product/entity/product";
import ProductModel from '../model/product.model';
import ProductMapper from "./product-mapper";

export default class ProductMapperImplementation implements ProductMapper {
  toEntity({ id, name, price }: ProductModel): Product {
    return new Product(id, name, price);
  }

  toModel(entity: Product): any {
    return {
      id: entity.id,
      name: entity.name,
      price: entity.price,
    };
  }
}