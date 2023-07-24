import Address from '../value-object/address';
import CustomerFactory from './customer.factory';

describe('Customer factory unit tests', () => {
  it('should be able create a customer', () => {
    let customer = CustomerFactory.create('Marcia');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Marcia');
    expect(customer.Address).toBeUndefined();
  });

  it('should create a customer with address', () => {
    const address = new Address('Street', 1, '12323-222', 'Luanda');

    let customer = CustomerFactory.createWithAddress('Herlander', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Herlander');
    expect(customer.Address).toBe(address);
  });
});
