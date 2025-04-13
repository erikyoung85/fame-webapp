import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { UserState } from './user.state';

export const INITIAL_USER_STATE: UserState = {
  session: wrapAsAsyncData(undefined),
};
