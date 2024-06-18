/**
 * Interface for header page details.
 */
export interface Header {
  /**
   * Import title to display title in page.
   */
  title?: string,
  /**
   * Import description to display description in page.
   */
  desc?: string,
  /**
   * Import button to display single button in page.
   */
  button?: buttonInfo,
  /**
   * Import button list to display multiple button in page.
   */
  buttonList?: Array<buttonInfo>
}
/**
 * Interface for header page buttons.
 */
export interface buttonInfo {
  /**
   * Import text color to display for in the button info.
   */
  color?: string,
  /**
   * Import button background color.
   */
  backgroundColor?: string,
  /**
   * Import text to display for in the button info.
   */
  text: string,
  /**
   * Import icon to display for in the button info.
  */
  icon?: string
  /**
  * Import method to display for in the button info.
  */
  method: string
}
