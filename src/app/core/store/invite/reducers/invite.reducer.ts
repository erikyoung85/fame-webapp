import { createReducer } from '@ngrx/store';
import { INITIAL_INVITE_STATE } from '../state/invite.initial-state';

export const inviteReducer = createReducer(INITIAL_INVITE_STATE)
