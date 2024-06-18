import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// Interface for header and produts pages
import { Header } from '../../../shared/interface/header';
import { ApiError, GetProduct, ProductList, UpdateProduct } from '../../interface/product-list';
//  Service and constant files.
import { ProductConstant } from '../../constants/product-constant';
import { ProductService } from '../../services/product.service';
import { DialogService } from '../../../shared/services/dialog.service';
/**
 * This component is used to create new product or update existing product. 
 */
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent extends ProductConstant {
  /**
   * Indicate that it can be accessed using a string key.
   */
  [key: string]: any;
  /**
   * Variable used to clear memory
   */
  subscriptionObj: Subscription = new Subscription();
  /**
   * Variable used to hold all the data need for current page.
   */
  porductDetails: ProductList | undefined;
  /**
   * Variable used to hold header details. 
   */
  headerDetail!: Header;
  /**
   * Variable used to handle product details.
   */
  productForm!: FormGroup;
  /**
   * Constructor is used for dependency injection
   * @param productService used to get http services for api request. 
   * @param dialogService used for dialog services.
   * @param dialogRef used to manage the state and behavior of a dialog.
   * @param data data which is taken from mat dialog.
   */
  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id?: number, type: string }
  ) {
    super();
  }
  /**
   * Angular life cycle hooks
   * Method used to retrieve params and product details
   */
  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.subscriptionObj.add(this.productService.getProduct(this.data && this.data.id).subscribe({
        next: (res: GetProduct | null) => {
          if (res && res.productDetails) {
            this.porductDetails = res.productDetails;
            this.initializeInfo(res.productDetails);
          } else {
            this.dialogService.openSnackBar(this.dialogMessages.productsFetchFailed);
            this.backToList();
          }
        }, error: (err: ApiError) => {
          this.dialogService.openSnackBar(err.error.Error);
          this.backToList();
        }
      }));
    } else {
      this.initializeInfo();
    }
  }
  /**
   * Method used to initialize page details.
   */
  initializeInfo(data?: ProductList): void {
    this.productForm = new FormGroup({
      name: new FormControl(data?.name ? data?.name : null, Validators.required),
      description: new FormControl(data?.description ? data?.description : null),
      // pattern validators check whether value contains only numbers.
      price: new FormControl(data?.price ? data?.price : null, [Validators.required, Validators.min(1), Validators.maxLength(9), Validators.pattern(/^[0-9]*$/)])
    });
    if (this.data.type === 'edit') {
      this.headerDetail = this.editProductHeader;
    } else if (this.data.type === 'view') {
      this.headerDetail = this.viewProductListHeader;
      this.productForm.disable();
    } else {
      this.headerDetail = this.addProductHeader;
    }
  }
  /**
   * Method used to trigger the function.
   * @param event to get the event
   */
  headerClick(event: string): void {
    if (event) {
      this[event]();
    }
  }
  /**
   * Method used to navigate back to product list.
   */
  backToList(): void {
    if (this.productForm.pristine) {
      this.dialogRef.close(false);
    } else {
      const dialogRef = this.dialogService.dialogMethod(this.dialogMessages.unsavedChanges);
      dialogRef.afterClosed().subscribe((res: boolean) => {
        if (res) {
          this.productForm.reset();
          this.dialogRef.close(false);
        }
      });
    }
  }
  /**
   * Method used to update existing product.
   */
  updateProduct(): void {
    if (this.data && this.data.id && this.productForm.valid && this.productForm.dirty) {
      this.subscriptionObj.add(this.productService.updateProduct(this.data.id, this.productForm.value).subscribe({
        next: (res: UpdateProduct) => {
          if (res && res.updateStatus) {
            this.productForm.reset();
            this.dialogService.openSnackBar(this.dialogMessages.productUpdateSuc);
            this.dialogRef.close(true);
          } else {
            this.dialogService.openSnackBar(this.dialogMessages.productUpdationFailed);
          }
        }, error: (err: ApiError) => {
          this.dialogService.openSnackBar(this.dialogMessages.productUpdationFailed);
        }
      }));
    } else {
      this.dialogService.openSnackBar(this.dialogMessages.noChanges);
    }
  }
  /**
   * Method used to create new product.
   */
  saveProduct(): void {
    if (this.productForm.valid) {
      this.subscriptionObj.add(this.productService.createProduct(this.productForm.value).subscribe({
        next: (res: GetProduct) => {
          if (res.success) {
            this.productForm.reset();
            this.dialogService.openSnackBar(this.dialogMessages.addProductSuc);
            this.dialogRef.close(true);
          } else {
            this.dialogService.openSnackBar(this.dialogMessages.invalidData);
          }
        }, error: (err: ApiError) => {
          this.dialogService.openSnackBar(this.dialogMessages.addProductFailed);
        }
      }));
    } else {
      this.productForm.markAllAsTouched();
      this.dialogService.openSnackBar(this.dialogMessages.mandatoryFieldsRequired);
    }
  }
  /**
   * method used to unsubscribe an object
   */
  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}