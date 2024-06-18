import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Service files
import { DialogService } from '../../../shared/services/dialog.service';
import { ProductConstant } from '../../constants/product-constant';
/**
 * This component used to login to the application.
 * ** Note this page is only implemented to check navigation working **  
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends ProductConstant {
  /**
   * Varibel used to hide password in ui.
   */
  hide!: boolean;
  /**
   * Variable used to handle login details.
   */
  loginForm!: FormGroup;
  /**
   * Constructor is used for dependency injection
   * @param route to navigate other pages.
   * @param dialogService used for dialog services.
   */
  constructor(
    private route: Router,
    private dialogService: DialogService
  ) {
    super();
  }
  /**
   * Angular life cycle hooks
   * Initialize login form
   */
  ngOnInit(): void {
    this.hide = true;
    this.loginForm = new FormGroup({
      email: new FormControl('admin@mailinator.com', Validators.required),
      password: new FormControl('Admin@1234', Validators.required),
    });
  }
  /**
   * Method used to check login authentication.
   * Navigate to product list page.
   */
  onSubmit(): void {
    const data = this.loginForm.value;
    if (data && data.email === 'admin@mailinator.com' && data.password === 'Admin@1234') {
      this.route.navigate(['/productslist']);
    } else {
      this.dialogService.openSnackBar(this.dialogMessages.authenticationFailed);
    }
  }
}
