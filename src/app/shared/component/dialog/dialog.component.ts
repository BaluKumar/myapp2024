import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * Component which is used for display the  dialog box.
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  /**
   * Constructor is used for dependency injection.
   * @param data data which is taken from mat dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
