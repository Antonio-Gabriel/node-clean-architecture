import Entity from '../../_shared/entity/entity.abstract';
import NotificationError from '../../_shared/notification/notification.error';
import AddressValidatorFactory from '../factory/address.validator.factory';

export default class Address extends Entity {
  private _street: string = '';
  private _number: number = 0;
  private _zip: string = '';
  private _city: string = '';

  constructor(street: string, number: number, zip: string, city: string) {
    super();
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();

    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }

  public get street(): string {
    return this._street;
  }

  public get number(): number {
    return this._number;
  }

  public get zip(): string {
    return this._zip;
  }

  public get city(): string {
    return this._city;
  }

  public validate() {
    AddressValidatorFactory.create().validate(this);
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}
