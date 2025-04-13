export interface AsyncData<T> {
  loading: boolean;
  error: string | undefined;
  data: T;
}

export function wrapAsAsyncData<T>(
  data: T,
  loading: boolean = false,
  error?: string
): AsyncData<T> {
  return {
    data: data,
    loading: loading,
    error: error,
  };
}
