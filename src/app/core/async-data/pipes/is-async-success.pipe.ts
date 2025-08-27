import { Pipe, PipeTransform } from '@angular/core';
import { AsyncData } from 'src/app/core/async-data/async-data.model';
import { isAsyncSuccess } from '../async-data.utils';

@Pipe({
  name: 'isAsyncSuccess',
})
export class IsAsyncSuccessPipe implements PipeTransform {
  transform<T = unknown>(value: AsyncData<T> | null | undefined) {
    return isAsyncSuccess(value);
  }
}
