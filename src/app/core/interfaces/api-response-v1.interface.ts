export interface ApiResponseSuccessV1<T> {
  data: T;
  error?: undefined;
}

export interface ApiResponseFailV1 {
  data?: undefined;
  error: string;
}

export type ApiResponseV1<T> = ApiResponseSuccessV1<T> | ApiResponseFailV1;
