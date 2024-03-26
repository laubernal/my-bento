export class Order {
  public static ORDER_FILTER = 'order';
  public static DESC_FILTER = 'desc';
  public static ASC_FILTER = 'asc';

  private order = new Map<string, string>();

  constructor(private _field: string) {}

  public desc(): this {
    this.order.set(this._field, 'desc');
    return this;
  }

  public asc(): this {
    this.order.set(this._field, 'asc');
    return this;
  }

  public build(): Map<string, string> {
    return this.order;
  }

  public set field(value: string) {
    this._field = value;
  }


  get field(): string {
    return this._field;
  }
}