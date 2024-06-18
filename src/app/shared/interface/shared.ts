/**
 * Interface for responce data for create and update api call.
 */
export interface ProductBodyData {
  /**
   * It denotes product name.
   */
  name: string,
  /**
   * It denotes product description.
   */
  description: string,
  /**
   * It denotes product price.
   */
  price: number
}