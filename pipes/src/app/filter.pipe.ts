import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0) return value;
    const resultArray = [];
    if (filterString === '') return value;
    for (let item of value) {
      if (item[propName].match(filterString)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
