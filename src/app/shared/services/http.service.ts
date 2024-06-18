import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductBodyData } from '../interface/shared';
/**
 * HttpService used to handle the routes.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // apiUrl used to store the environment datas.
  apiUrl = environment.apiUrl;
  /**
   * Constructor  which is used to inject services.
   * @param httpClient Service to send the api request to the server.
   */
  constructor(private httpClient: HttpClient) { }
  /**
   *  Method Which is used to send the post api request to the server.
   * @param url Define api request url
   * @param data Define the data
   * @returns api responce
   */
  postMethod(url: string, data: ProductBodyData) {
    return this.httpClient.post(this.apiUrl + url, data);
  }
  /**
   * Method Which is used to send the get api request to the server
   * @param url Define api request url
   * @returns api responce
   */
  getMethod(url: string) {
    return this.httpClient.get(this.apiUrl + url);
  }
  /**
   * Method putMethod Which is used to send the put api request to the server.
   * @param url Define api request url
   * @param data Define api request url
   * @param queryParam Defines the other optional parameters.
   * @returns api responce
   */
  putMethod(url: string, data: ProductBodyData, queryParam: any) {
    console.log("request", this.apiUrl, data, queryParam);
    return this.httpClient.put(this.apiUrl, data, { params: queryParam });
  }
  /**
   * Method remove Which is used to send the delete api request to the server.
   * @param url Define api request url
   * @returns api responce
   */
  removeMethod(url: string) {
    return this.httpClient.delete(this.apiUrl + url);
  }
}
