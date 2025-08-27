import { Pipe, PipeTransform } from '@angular/core';
import { AsyncData } from 'src/app/core/async-data/async-data.model';
import { isAsyncError } from '../async-data.utils';

@Pipe({
  name: 'isAsyncError',
})
export class IsAsyncErrorPipe implements PipeTransform {
  transform<T = unknown>(value: AsyncData<T> | null | undefined) {
    return isAsyncError(value);
  }
}
