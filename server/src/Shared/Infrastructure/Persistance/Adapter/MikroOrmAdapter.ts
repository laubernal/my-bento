import { Order } from 'Shared/Domain/Entities/Order';
import { Pagination } from 'Shared/Domain/Entities/Pagination';
import { NumberVo } from 'Shared/Domain/Vo/Number.vo';

export class MikroOrmAdapter {
  protected mikroOrmFilter = {};

  protected assign(filter: any): void {
    this.mikroOrmFilter = Object.assign(this.mikroOrmFilter, filter);
  }

  protected applyPagination(filters: Map<string, any>) {
    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      return this.pagination(pagination);
    }

    return this.mikroOrmFilter;
  }

  protected applyOrderBy(filters: Map<string, any>) {
    const pagination = this.applyPagination(filters);

    if (filters.has(Order.ORDER_BY_FILTER)) {
      const orderBy = filters.get(Order.ORDER_BY_FILTER);

      return {
        ...pagination,
        orderBy: this.order(orderBy),
      };
    }

    return this.mikroOrmFilter;
  }

  protected pagination(pagination: Pagination) {
    const paginationFilter = pagination.build();

    const query = {};

    if (paginationFilter.has(Pagination.PAGE_FILTER)) {
      const page = paginationFilter.get(Pagination.PAGE_FILTER) as NumberVo;
      const perPage = paginationFilter.get(Pagination.PER_PAGE_FILTER) as NumberVo;

      Object.assign(query, {
        offset: perPage.value * (page.value - 1),
      });
    }

    if (paginationFilter.has(Pagination.PER_PAGE_FILTER)) {
      const perPage = paginationFilter.get(Pagination.PER_PAGE_FILTER) as NumberVo;

      Object.assign(query, { limit: perPage.value });
    }

    return query;
  }

  protected order(order: Order) {
    const orderFilter = order.build();

    if (orderFilter.has(Order.ORDER_BY_FILTER)) {
      const orderBy = orderFilter.get(Order.ORDER_BY_FILTER);
      return orderBy;
    }
  }
}
