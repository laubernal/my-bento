import { Order } from "Shared/Domain/Entities/Order";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { FilterError } from "Shared/Domain/Error/FilterError";

export abstract class Filter {
  protected abstract data: Map<string, any>;

  public paginate(): this {
    const pagination = new Pagination();
    this.data.set(Pagination.PAGINATION_FILTER, pagination);
    return this;
  }

  public orderBy(field: string): this {
    const existingOrderFilter = this.data.get(Order.ORDER_FILTER) as Order | undefined;

    if (existingOrderFilter) {
      existingOrderFilter.field = field;

      return this;
    }

    const order = new Order(field);
    this.data.set(Order.ORDER_FILTER, order);

    return this;
  }

  public abstract apply(): Map<string, any>;

  public setQuantity(quantity: number): this {
    const pagination = this.getFilter<Pagination>(Pagination.PAGINATION_FILTER);

    pagination.setQuantity(quantity);

    return this;
  }

  public setPage(page: number): this {
    const pagination = this.getFilter<Pagination>(Pagination.PAGINATION_FILTER);

    pagination.setPage(page);

    return this;
  }

  public desc(): this {
    const order = this.getFilter<Order>(Order.ORDER_FILTER)

    order.desc();

    return this;
  }

  public asc(): this {
    const order = this.getFilter<Order>(Order.ORDER_FILTER);

    order.asc();

    return this;
  }

  private getFilter<T>(filterName: string): T {
    const filter: T | undefined = this.data.get(filterName);

    if (!filter) {
      throw new FilterError(`${filterName} is not in filter collection`);
    }

    return filter;
  }
}
