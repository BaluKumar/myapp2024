/**
 * Interface for product details.
 */
export interface ProductList {
  /**
   * It denotes product created date.
   */
  created: string,
  /**
   * It denotes product description.
   */
  description: string,
  /**
   * It denotes product id.
   */
  id: number,
  /**
   * It denotes that product is soft deleted or not.
   */
  isDeleted: boolean,
  /**
   * It denotes product last modified date.
   */
  modified: string,
  /**
   * It denotes product name.
   */
  name: string,
  /**
   * It denotes product price.
   */
  price: number
}
/**
 * Interface for get all product api responce.
 */
export interface GetAllProduct {
  /**
   * It denotes list of product list and count.
   */
  productList?: {
    /**
     * It denotes product list.
     */
    rows: Array<ProductList>,
    /**
     * It denotes count of product list.
     */
    count: number
  }
}
/**
 * Interface for single get product api responce.
 */
export interface GetProduct {
  /**
   * It denotes product details.
   */
  productDetails?: ProductList,
  /**
   * It denotes status
   */
  success?: boolean
}
/**
 * Interface for delete api call
 */
export interface UpdateProduct {
  /**
   * It denotes status
   */
  success?: boolean,
  /**
   * It denotes deletion status
   */
  deleteStatus?: boolean,
  /**
   * It denotes updation status
   */
  updateStatus?: boolean
}
/**
 * Interface for Api Error
 */
export interface ApiError {
  /**
   * It denotes status
   */
  success: boolean,
  /**
   * It denotes error details
   */
  error: {
    /**
     * It denotes error message
     */
    Error: string
  }
}