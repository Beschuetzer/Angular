import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, maxLength: number) {
    if (value?.length > maxLength) return value.substr(0, maxLength) + '...';
    else return value;
  }
}