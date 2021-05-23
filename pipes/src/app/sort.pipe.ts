import { Pipe, PipeTransform } from '@angular/core';

type Server = {
  instanceType: string,
  name: string,
  status: string,
  started: Date,
};

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {

  transform(values: any[], propToUseForSorting: string): any[] {
    if (!values[0][propToUseForSorting]) return ['Error in Sort Pipe'];

    if (!propToUseForSorting) {
      values.sort((a,b) => {
        if (a > b) return 1;
        else if (b > a) return -1;
        else return 0;
      })
    } else {
      values.sort((a, b) => {
        if (a[propToUseForSorting] > b[propToUseForSorting]) return 1;
        else if (a[propToUseForSorting] < b[propToUseForSorting]) return -1;
        else return 0;
      });
    }

    return values;
  }

}
