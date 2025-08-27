export enum AsyncDataStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export interface AsyncDataError<T> {
  data: T;
  status: AsyncDataStatus.Error;
  error: string;
}
export interface AsyncDataSuccess<T> {
  data: T;
  status: AsyncDataStatus.Success;
  error: undefined;
}
export interface AsyncDataLoading<T> {
  data: T;
  status: AsyncDataStatus.Loading;
  error: undefined;
}
export interface AsyncDataIdle<T> {
  data: T;
  status: AsyncDataStatus.Idle;
  error: undefined;
}
export type AsyncData<T> =
  | AsyncDataSuccess<T>
  | AsyncDataError<T>
  | AsyncDataLoading<T>
  | AsyncDataIdle<T>;
