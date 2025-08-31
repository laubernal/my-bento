export class Order {
    public static ORDER_BY_FILTER = 'orderBy';
    public static ORDER_DIRECTION_FILTER = 'orderDirection';
    public static ORDER_FILTER = 'order';

    private order: Map<string, any> = new Map();

    public setOrderBy(order: string): this {
        this.order.set(Order.ORDER_BY_FILTER, order);

        return this;
    }

    public setOrderDirection(direction: string): this {
        this.order.set(Order.ORDER_DIRECTION_FILTER, direction);

        return this;
    }

    public build(): Map<string, string> {
        return this.order;
    }
}
