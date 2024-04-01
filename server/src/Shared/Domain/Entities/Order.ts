export class Order {
  public static ORDER_BY_FILTER = 'orderBy';

  private order: Map<string, any> = new Map();

  public orderBy(order: string[][]): this {
    this.order.set(Order.ORDER_BY_FILTER, order);

    return this;
  }

  public build(): Map<string, string> {
    return this.order;
  }
}
