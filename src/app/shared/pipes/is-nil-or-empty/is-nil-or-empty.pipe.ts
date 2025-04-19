import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isNil } from 'ramda';

@Pipe({
  name: 'isNilOrEmpty',
})
export class IsNilOrEmptyPipe implements PipeTransform {
  transform(value: any): boolean {
    if (isNil(value) || isEmpty(value)) return true;
    else return false;
  }
}
