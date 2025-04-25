import { Pipe, PipeTransform } from '@angular/core';
import {
  AsyncData,
  AsyncDataStatus,
} from 'src/app/core/models/AsyncData.model';

@Pipe({
  name: 'isAsyncLoading',
})
export class IsAsyncLoadingPipe implements PipeTransform {
  transform<T>(value: AsyncData<T> | null | undefined): boolean {
    return (
      value?.status === AsyncDataStatus.Idle ||
      value?.status === AsyncDataStatus.Loading
    );
  }
}
