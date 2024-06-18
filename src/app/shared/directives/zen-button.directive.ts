import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZenButton]'
})
export class ZenButtonDirective {
  /**
   * It gives color need to apply for parent component
   */
  @Input() color: string | undefined;
  /**
   * 
   */
  @Input() backgroundColor: string | undefined;
  /**
   * Constructor is used for dependency injection
   * @param el 
   * @param renderer 
   */
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  /**
   * Angular life-cycle hooks
   */
  ngAfterViewInit(): void {
    this.onResize();
  }
  /**
   * Function called every changes of screen and it set button style.
   */
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const element = this.el.nativeElement;
    if (element) {
      this.renderer.addClass(element, 'zen__button');
      this.renderer.setStyle(element, 'color', this.color ? this.color : 'black');
      this.renderer.setStyle(element, 'background-color', this.backgroundColor ? this.backgroundColor : 'white');
    }
  }
  /**
   * This event is triggered when the mouse pointer enter the element.
   */
  @HostListener('mouseenter') onMouseEnter(): void {
    this.hoverEffect(this.color && this.color != 'white' ? this.color : 'black', true);
  }
  /**
   * This event is triggered when the mouse pointer leaves the element.
   */
  @HostListener('mouseleave') onMouseLeave(): void {
    this.hoverEffect(this.backgroundColor ? this.backgroundColor : 'white', false);
  }
  /**
   * Method used set and remove hover effect.
   * @param color to get color name need to apply.
   * @param setHoverStyle give elemnet is hover or not.
   */
  hoverEffect(color: string, setHoverStyle: boolean): void {
    const element = this.el.nativeElement;
    if (setHoverStyle) {

      const convertColor = this.colorNameToRgb(color).replace(')', ', 0.1)'); // set's rgb color opacity to 0.1.
      this.renderer.setStyle(element, 'background-color', convertColor);
    } else {
      this.renderer.setStyle(element, 'background-color', color);
    }
  }
  /**
   * Method used to convert color name to rgb color.
   * @param colorName to get color name need to apply.
   * @returns color in rgb format.
   */
  colorNameToRgb(colorName: string): string {
    // Create a temporary element
    const tempElement = document.createElement('div');
    tempElement.style.color = colorName;
    document.body.appendChild(tempElement);

    // Get the computed color in rgb format
    const computedColor = getComputedStyle(tempElement).color;

    // Remove the temporary element
    document.body.removeChild(tempElement);

    // Return the RGB components
    return computedColor;
  }
}
