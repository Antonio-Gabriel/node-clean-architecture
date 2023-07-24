export type EventDataType = {};

export default abstract class Event<T> {
  private _dataTimeOcurred: Date;
  private _eventData: T;

  constructor(eventData: T) {
    this._dataTimeOcurred = new Date();
    this._eventData = eventData;
  }

  public get dataTimeOcurred(): Date {
    return this._dataTimeOcurred;
  }

  public get eventData(): T {
    return this._eventData;
  }
}
