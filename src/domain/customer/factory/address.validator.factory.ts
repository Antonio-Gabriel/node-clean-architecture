import ValidatorInterface from '../../_shared/validator/validator.interface';
import AddressYupValidator from '../validator/address.yup.validator';
import Address from '../value-object/address';

export default class AddressValidatorFactory {
  static create(): ValidatorInterface<Address> {
    return new AddressYupValidator();
  }
}
