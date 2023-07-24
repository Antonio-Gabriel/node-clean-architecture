import Customer from '../../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../../domain/customer/value-object/address';
import CustomerMapper from '../mapper/customer-mapper';
import CustomerModel from '../model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  private _mapper: CustomerMapper;

  constructor(mapper: CustomerMapper) {
    this._mapper = mapper;
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create(this._mapper.toModel(entity));
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(this._mapper.toModel(entity), {
      where: {
        id: entity.id,
      },
    });
  }

  async findById(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
      return this._mapper.toEntity(customerModel);
    } catch (error) {
      throw new Error('Customer not found');
    }
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customer) => this._mapper.toEntity(customer));
  }
}
