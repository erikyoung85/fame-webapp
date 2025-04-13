import { MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { loggerMetaReducer } from './logger.meta-reducer';

export function getMetaReducers(): MetaReducer[] {
  const metaReducers: MetaReducer[] = [];
  if (environment.production === false) {
    metaReducers.push(loggerMetaReducer);
  }
  return metaReducers;
}
