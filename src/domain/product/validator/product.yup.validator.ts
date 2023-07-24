import * as yup from 'yup';
import ValidatorInterface from '../../_shared/validator/validator.interface';
import Product from '../entity/product';

export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  public validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup
            .number()
            .required('price must be greater than 0').moreThan(0)
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const err = error as yup.ValidationError;

      err.errors.forEach((error) => {
        entity.notification.addError({
          context: 'product',
          message: error,
        });
      });
    }
  }
}

// Herlander Bento
