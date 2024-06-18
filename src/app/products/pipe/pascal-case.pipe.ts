import { Pipe, PipeTransform } from '@angular/core';
/**
 * Pipe used to transform naming convention to pascal case  
 */
@Pipe({
  name: 'pascalCase'
})
export class PascalCasePipe implements PipeTransform {
  /**
   * Function which converts the format of a string into camel case
   * @param value string must be formatted.
   * @returns formatted string.
   */
  transform(value: string): string {
    let pascalCaseMod = value, splitArray: Array<string>;
    if (value) {
      pascalCaseMod = value.trim().toLowerCase();
      splitArray = pascalCaseMod.split(/\s+/); //It split the string based on space and returns as array.
      if (splitArray && splitArray.length) {
        pascalCaseMod = '';
        splitArray.forEach((value: string) => {
          pascalCaseMod = pascalCaseMod ? pascalCaseMod + value[0].toUpperCase() + value.slice(1) : value[0].toUpperCase() + value.slice(1);
        });
      }
    }
    return pascalCaseMod;
  }

}
