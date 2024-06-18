export class ProductConstant {
  /**
   * Product list page header details.
   */
  productListHeader = {
    title: 'Products List',
    button: { text: 'Add Product', color: 'red', icon: 'add', method: 'addProduct' }
  };
  /**
   * Product list page header details.
   */
  viewProductListHeader = {
    title: 'View Products',
    button: { text: 'Back', color: 'black', method: 'backToList' },
  };
  /**
   * Edit product page header details.
   */
  editProductHeader = {
    title: 'Edit Product',
    buttonList: [
      { text: 'Back', color: 'black', method: 'backToList' },
      { text: 'Update', color: 'green', method: 'updateProduct' }
    ]
  };
  /**
   * Add product page header details.
   */
  addProductHeader = {
    title: 'Add Product',
    buttonList: [
      { text: 'Back', color: 'black', method: 'backToList' },
      { text: 'Save', color: 'blue', method: 'saveProduct' }
    ]
  };
  /**
   * Product list table display order.
   */
  displayColumn = ['id', 'name', 'price', 'description', 'action'];
  /**
   * Constants used for dialog messages
   */
  dialogMessages = {
    deleteConfirmationMsg: 'Are you sure you want to remove this product?',
    authenticationFailed: 'Failed to login.',
    productsFetchFailed: 'failed to fetch product details.',
    unsavedChanges: 'You have unsaved changes. Are you sure you want to leave this page?',
    productUpdationFailed: 'Failed to update product details.',
    noChanges: 'No changes to update.',
    noRecordFound: 'No records found!',
    invalidData: 'Provide valid data.',
    mandatoryFieldsRequired: 'fill out mandatory fields.',
    addProductFailed: 'Failed to add product.',
    deleteProductFailed: 'failed to get product details.',
    addProductSuc: 'Product added successfully.',
    deleteProductSuc: 'Product removed successful.',
    productUpdateSuc: 'Product details updated successfully.',
  };
}