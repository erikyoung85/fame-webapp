import { HttpHandlerFn } from '@angular/common/http';
import { HttpRequest } from '@angular/common/module.d-CnjH8Dlt';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userFeature } from '../store/user/feature/user.feature';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const store = inject(Store);

  const authToken = store.selectSignal(userFeature.selectSupabaseAuthToken)();
  if (!authToken) {
    return next(req);
  }

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });
  return next(newReq);
}
