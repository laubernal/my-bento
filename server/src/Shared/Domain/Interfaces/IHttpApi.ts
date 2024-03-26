export interface IHttpApi {
  get<T>(url: string): Promise<T>;

  post<T, C>(url: string, body: C): Promise<T>;
}