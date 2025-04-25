export enum AsyncDataStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export interface AsyncData<T> {
  data: T;
  status: AsyncDataStatus;
  error: string | undefined;
}

export function wrapAsAsyncData<T>(
  data: T,
  status: AsyncDataStatus = AsyncDataStatus.Idle,
  error?: string
): AsyncData<T> {
  return {
    data: data,
    status: status,
    error: error,
  };
}
