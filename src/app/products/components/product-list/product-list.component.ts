import { Component, ViewChild } from '@angular/core';
import { Subscription, filter, map, mergeMap, of, switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
// Service files.
import { ProductService } from '../../services/product.service';
import { DialogService } from '../../../shared/services/dialog.service';
// Interface and constant files
import { Header } from '../../../shared/interface/header';
import { ProductList, GetAllProduct, ApiError, UpdateProduct } from '../../interface/product-list';
import { ProductConstant } from '../../constants/product-constant';
import { UntypedFormControl } from '@angular/forms';

/**
 * This component is used to display list of products
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent extends ProductConstant {
  /**
   * Indicate that it can be accessed using a string key.
   */
  [key: string]: any;
  /**
   * Variable used to hold search text.
   */
  searchField = new UntypedFormControl('');
  /**
   * Variable used to hold header details. 
   */
  headerDetail!: Header;
  /**
   * Variable used to hold list of products
   */
  elementData: ProductList[] = [];
  /**
   * Variable used to display table
   */
  productList = new MatTableDataSource<ProductList>([]);
  /**
   * Variable used to hold table display order. 
   */
  displayColumns: string[] = this.displayColumn;
  /**
   * Variable used to clear memory
   */
  subscriptionObj: Subscription = new Subscription();
  /**
   * Variable which is used to get table paginator template in viewchild properties
   * @type {TemplateRef}
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * Variable which is used to get table sort template in viewchild properties
   * @type {TemplateRef}
   */
  @ViewChild(MatSort) sort!: MatSort;
  /**
   * Constructor is used for dependency injection
   * @param productService used to get http services for api request.
   * @param dialogService is used to access dialog methods.
   * @param dialog To access the functions inside the material dialog box.
   */
  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {
    super();
  }
  /**
   * Angular life cycle hooks
   */
  ngOnInit(): void {
    this.headerDetail = this.productListHeader;
    this.getProducts();
    this.onSearch();
  }
  /**
   * Method used to get all product data.
   */
  getProducts(): void {
    this.subscriptionObj.add(this.productService.getAllProducts().subscribe({
      next: (res: GetAllProduct) => {
        if (res && res.productList && res.productList.rows && res.productList.rows.length) {
          this.elementData = res.productList.rows;
          this.productList = new MatTableDataSource<ProductList>(this.elementData);
          this.productList.paginator = this.paginator;
          this.productList.sort = this.sort;
          this.searchField.setValue('');
        } else {
          this.productList = new MatTableDataSource<ProductList>([]);
          this.dialogService.openSnackBar(this.dialogMessages.noRecordFound);
        }
      }, error: (err: ApiError) => {
        this.dialogService.openSnackBar(this.dialogMessages.productsFetchFailed);
      }
    }));
  }
  /**
   * Method used to filter record on product list bsed on product name.
   */
  onSearch() {
    this.subscriptionObj.add(this.searchField.valueChanges.subscribe((searchText: any) => {
      this.productList = new MatTableDataSource<ProductList>(this.elementData.filter((res) => res && res.name && res.name.toLowerCase().includes(searchText)));
      this.productList.paginator = this.paginator;
      this.productList.sort = this.sort;
    }));
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
   * Method used to open add or edit dialog page.
   * @param type it hold dialog type.
   * @param id to get product id. 
   */
  addProduct(type: string, id?: number): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '500px',
      data: id ? { id: id, type: type } : { type: type },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.getProducts();
      }
    });
  }
  /**
   * Method used to remove particular product data.
   * @param id to get product id 
   */
  removeProduct(id?: number): void {
    if (id) {
      const dialogRef = this.dialogService.dialogMethod(this.dialogMessages.deleteConfirmationMsg)
      this.subscriptionObj.add(dialogRef.afterClosed().pipe(mergeMap((res: any) => {
        if (res) {
          return this.productService.removeProduct(id);
        }
        return of(null);
      })).subscribe({
        next: (res: UpdateProduct | null) => {
          if (res && res.deleteStatus) {
            this.dialogService.openSnackBar(this.dialogMessages.deleteProductSuc);
            this.getProducts();
          }
        }, error: (err: ApiError) => {
          this.dialogService.openSnackBar(err.error.Error);
        }
      }));
    } else {
      this.dialogService.openSnackBar(this.dialogMessages.deleteProductFailed);
    }
  }
  /**
   * Method used to unsubscribe an object
   */
  ngOnDestroy(): void {
    this.subscriptionObj.unsubscribe();
  }
}