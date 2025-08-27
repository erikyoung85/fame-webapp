import { Pipe, PipeTransform } from '@angular/core';
import { AsyncData } from 'src/app/core/async-data/async-data.model';
import { isAsyncLoading } from '../async-data.utils';

@Pipe({
  name: 'isAsyncLoading',
})
export class IsAsyncLoadingPipe implements PipeTransform {
  transform<T = unknown>(value: AsyncData<T> | null | undefined) {
    return isAsyncLoading(value);
  }
}
