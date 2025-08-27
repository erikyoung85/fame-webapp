import {
  AsyncData,
  AsyncDataError,
  AsyncDataIdle,
  AsyncDataLoading,
  AsyncDataStatus,
  AsyncDataSuccess,
} from './async-data.model';

export function wrapAsAsyncData<T>(
  data: T,
  status?: AsyncDataStatus.Idle,
  error?: string
): AsyncDataIdle<T>;
export function wrapAsAsyncData<T>(
  data: T,
  status?: AsyncDataStatus.Loading,
  error?: string
): AsyncDataLoading<T>;
export function wrapAsAsyncData<T>(
  data: T,
  status?: AsyncDataStatus.Success,
  error?: string
): AsyncDataSuccess<T>;
export function wrapAsAsyncData<T>(
  data: T,
  status?: AsyncDataStatus.Error,
  error?: string
): AsyncDataError<T>;
export function wrapAsAsyncData<T>(
  data: T,
  status: AsyncDataStatus,
  error?: string
): AsyncData<T>;
export function wrapAsAsyncData<T>(
  data: T,
  status: AsyncDataStatus = AsyncDataStatus.Idle,
  error?: string
): AsyncData<T> {
  switch (status) {
    case AsyncDataStatus.Error:
      return {
        data: data,
        status: AsyncDataStatus.Error,
        error: error ?? 'An error occurred',
      };
    default:
      return {
        data: data,
        status: status,
        error: undefined,
      };
  }
}

export function isAsyncIdle<T = unknown>(
  value: AsyncData<T> | null | undefined
) {
  return value?.status === AsyncDataStatus.Idle;
}

export function isAsyncLoading<T = unknown>(
  value: AsyncData<T> | null | undefined
) {
  return (
    value?.status === AsyncDataStatus.Idle ||
    value?.status === AsyncDataStatus.Loading
  );
}

export function isAsyncLoaded<T = unknown>(
  value: AsyncData<T> | null | undefined
) {
  return (
    value?.status === AsyncDataStatus.Success ||
    value?.status === AsyncDataStatus.Error
  );
}

export function isAsyncSuccess<T = unknown>(
  value: AsyncData<T> | null | undefined
) {
  return value?.status === AsyncDataStatus.Success;
}

export function isAsyncError<T = unknown>(
  value: AsyncData<T> | null | undefined
) {
  return value?.status === AsyncDataStatus.Error;
}
