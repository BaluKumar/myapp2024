import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Header, buttonInfo } from '../../interface/header';
/**
 * This component used to display page header
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  /**
   * Variable used to get header details.
   */
  @Input() headerDetails!: Header;
  /**
   * Variable which is used for emitting the value.
   */
  @Output() methodClicked = new EventEmitter<string>();
  /**
   * Constructor is used for dependency injection
   */
  constructor() { }
  /**
   * Angular life cycle hooks
   */
  ngOnInit(): void { }
  /**
   * Method which is used to emit the event.
   * @param event gives button info.
   */
  buttonClick(event?: buttonInfo): void {
    if (event) {
      this.methodClicked.emit(event?.method);
    }
  }
}
