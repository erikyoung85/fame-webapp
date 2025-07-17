import { createFeature } from '@ngrx/store';
import { inviteReducer } from '../reducers/invite.reducer';

export const inviteFeature = createFeature({
  name: 'invite',
  reducer: inviteReducer,
})
