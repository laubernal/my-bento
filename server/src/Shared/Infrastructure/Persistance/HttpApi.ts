import axios, { AxiosRequestConfig } from 'axios';
import { IHttpApi } from "../../Domain/Interfaces/IHttpApi";

export abstract class HttpApi implements IHttpApi {
  protected abstract BASE_URL: string;
  private config: AxiosRequestConfig = {};

  public async get<T>(url: string, params?: any): Promise<T> {
    return await axios.get(`${this.BASE_URL}${url}`, params ? params : this.config);
  }

  public async post<T, C>(url: string, body: C): Promise<T> {
    return await axios.post(`${this.BASE_URL}${url}`, body, this.config);
  }

  public headers(headers: any): void {
    this.config = { ...this.config, headers };
  }

  public params(params: any): void {
    this.config = { ...this.config, params }
  }
}
