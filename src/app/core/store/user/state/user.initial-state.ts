import { wrapAsAsyncData } from 'src/app/core/models/AsyncData.model';
import { UserState } from './user.state';

export const INITIAL_USER_STATE: UserState = {
  userProfile: wrapAsAsyncData(undefined),
  session: wrapAsAsyncData(undefined),
  managedPages: wrapAsAsyncData({
    athletes: [],
    teams: [],
    raffles: [],
  }),
};
