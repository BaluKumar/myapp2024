import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DialogComponent } from '../component/dialog/dialog.component';
/**
 * Dialog Service which is used to open the dialog box from dialog component.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  /**
   * Constructor is used for dependency injection
   * @param dialog To access the functions inside the material dialog box.
   * @param snackBar used to open snack Bar.
   */
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }
  /**
   * Method used to open snack Bar.
   * @param message message to display in snack bar.
   */
  openSnackBar(message: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, 'X', { duration: 2000 });
  }
  /**
   * Method which is used to open the confirmation dialog box.
   * @param message message to display in snack bar.
   */
  dialogMethod(message: string): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      width: "300px",
      data: message,
      disableClose: true
    });
  }
}
