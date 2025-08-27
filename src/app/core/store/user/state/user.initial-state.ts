import { wrapAsAsyncData } from 'src/app/core/async-data';
import { UserState } from './user.state';

export const INITIAL_USER_STATE: UserState = {
  session: wrapAsAsyncData(undefined),
  userProfile: wrapAsAsyncData(undefined),
  enteredRaffles: wrapAsAsyncData([]),
  managedPages: wrapAsAsyncData({
    athletes: [],
    teams: [],
    raffles: [],
  }),
};
