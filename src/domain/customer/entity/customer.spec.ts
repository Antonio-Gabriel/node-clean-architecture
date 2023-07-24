import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'John');
    }).toThrowError('customer: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '');
    }).toThrowError('customer: Name is required');
  });

  it('should throw error when name is and id are empty', () => {
    expect(() => {
      let customer = new Customer('', '');
    }).toThrowError('customer: Id is required,customer: Name is required');
  });

  it('should change name', () => {
    //Arrange
    const customer = new Customer('123', 'John');

    //Act
    customer.changeName('Jane');

    // Assert
    expect(customer.name).toBe('Jane');
  });

  it('should active customer', () => {
    const customer = new Customer('124', 'Herlander Bento');
    const address = new Address('Rua Santa Isabel II', 2, '1234-678', 'Luanda');
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('124', 'Herlander Bento');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('124', 'Herlander Bento');

      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
