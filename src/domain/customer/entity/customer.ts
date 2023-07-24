import Entity from '../../_shared/entity/entity.abstract';
import NotificationError from '../../_shared/notification/notification.error';
import CustomerValidatorFactory from '../factory/customer.validator.factory';
import Address from '../value-object/address';

export default class Customer extends Entity {
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }

  public get name(): string {
    return this._name;
  }

  public get rewardPoints(): number {
    return this._rewardPoints;
  }

  public validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  public changeName(name: string) {
    this._name = name;
    this.validate();
  }

  public get Address(): Address {
    return this._address;
  }

  public changeAddress(address: Address) {
    this._address = address;
  }

  public isActive(): boolean {
    return this._active;
  }

  public activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  public deactivate() {
    this._active = false;
  }

  public addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
