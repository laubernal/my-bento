export class Pagination {
  public static PAGINATION_FILTER = 'pagination';
  public static PAGE_FILTER = 'page';
  public static QUANTITY_FILTER = 'quantity';

  private pagination = new Map<string, number>();

  public setPage(page: number): this {
    this.pagination.set(Pagination.PAGE_FILTER, page);
    return this;
  }

  public setQuantity(quantity: number): this {
    this.pagination.set(Pagination.QUANTITY_FILTER, quantity);
    return this;
  }

  public first(): this {
    this.pagination.set(Pagination.QUANTITY_FILTER, 1);
    return this;
  }

  public build(): Map<string, number> {
    return this.pagination;
  }
}