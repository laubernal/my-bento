import { NumberVo } from '../Vo/Number.vo';
import { Order } from './Order';
import { Pagination } from './Pagination';

export abstract class Filter {
  protected abstract data: Map<string, any>;

  public abstract apply(): Map<string, any>;

  public paginate(): this {
    const pagination = new Pagination();

    this.data.set(Pagination.PAGINATION_FILTER, pagination);

    return this;
  }

  public setPage(page: NumberVo): this {
    const pagination = this.data.get(Pagination.PAGINATION_FILTER);

    pagination.setPage(page);

    return this;
  }

  public setPerPage(perPage: NumberVo): this {
    const pagination = this.data.get(Pagination.PAGINATION_FILTER);

    pagination.setPerPage(perPage);

    return this;
  }

  public order(): this {
    const order = new Order();

    this.data.set(Order.ORDER_BY_FILTER, order);

    return this;
  }

  public orderBy(orderBy: string[][]): this {
    const order = this.data.get(Order.ORDER_BY_FILTER);

    order.orderBy(orderBy);

    return this;
  }
}
