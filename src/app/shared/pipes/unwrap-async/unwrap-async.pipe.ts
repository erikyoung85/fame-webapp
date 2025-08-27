import { Pipe, PipeTransform } from '@angular/core';
import { AsyncData } from 'src/app/core/async-data';

@Pipe({
  name: 'unwrapAsync',
})
export class UnwrapAsyncPipe implements PipeTransform {
  transform<T>(value: AsyncData<T> | null | undefined): T | undefined {
    return value?.data;
  }
}
