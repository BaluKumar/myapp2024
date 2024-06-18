import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/services/http.service';
// Interface file
import { ProductBodyData } from '../../shared/interface/shared';
import { GetAllProduct, GetProduct, UpdateProduct } from '../interface/product-list';
/**
 * This service used to perform CRUD operations.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /**
   * Constructor is used for dependency injection.
   * @param httpService used to make api call.
   */
  constructor(private httpService: HttpService) { }
  /**
   * Method used to create product.
   * @param data has request data.
   * @returns response.
   */
  createProduct(data: ProductBodyData): Observable<GetProduct> {
    return this.httpService.postMethod('/', data);
  }
  /**
   * Method used to get all product details.
   * @returns response.
   */
  getAllProducts(): Observable<GetAllProduct> {
    return this.httpService.getMethod('/');
  }
  /**
   * Method used to get product details.
   * @param id has request product id.
   * @returns responce.
   */
  getProduct(id: number): Observable<GetProduct> {
    return this.httpService.getMethod(`/${id}`);
  }
  /**
   * Method used to update product details.
   * @param id has request product id.
   * @param data is the data to update product details.
   * @returns responce.
   */
  updateProduct(id: number, data: ProductBodyData): Observable<UpdateProduct> {
    return this.httpService.putMethod('/', data, { id: id });
  }
  /**
   * Method used to remove product details.
   * @param data has request product id.
   * @returns responce.
   */
  removeProduct(data: number): Observable<UpdateProduct> {
    return this.httpService.removeMethod(`/${data}`);
  }
}
