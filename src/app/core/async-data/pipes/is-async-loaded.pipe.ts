import { Pipe, PipeTransform } from '@angular/core';
import { AsyncData } from 'src/app/core/async-data/async-data.model';
import { isAsyncLoaded } from '../async-data.utils';

@Pipe({
  name: 'isAsyncLoaded',
})
export class IsAsyncLoadedPipe implements PipeTransform {
  transform<T = unknown>(value: AsyncData<T> | null | undefined) {
    return isAsyncLoaded(value);
  }
}
