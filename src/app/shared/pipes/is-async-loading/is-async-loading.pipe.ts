import { Pipe, PipeTransform } from '@angular/core';
import { AsyncData } from 'src/app/core/models/AsyncData.model';

@Pipe({
  name: 'isAsyncLoading',
})
export class IsAsyncLoadingPipe implements PipeTransform {
  transform<T>(value: AsyncData<T> | null | undefined): boolean {
    return value?.loading === true;
  }
}
