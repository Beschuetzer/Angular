import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(someString: string): string {
    const reversed = []
    for (let i = someString.length - 1; i >= 0 ; i--) {
      const char = someString[i];
      reversed.push(char);
    } 
    return reversed.join('');
  }

}
