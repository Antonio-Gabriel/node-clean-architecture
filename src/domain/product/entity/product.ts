import Entity from '../../_shared/entity/entity.abstract';
import NotificationError from '../../_shared/notification/notification.error';
import ProductValidatorFactory from '../factory/product.validator.factory';

export default class Product extends Entity {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();

    if (this.notification.hasErrors())
      throw new NotificationError(this.notification.getErrors());
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public changeName(name: string) {
    this._name = name;
    this.validate();
  }

  public changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  public validate(): void {
    ProductValidatorFactory.create().validate(this);
  }
}
