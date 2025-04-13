import { Action, ActionReducer } from '@ngrx/store';

export function loggerMetaReducer(
  reducer: ActionReducer<{}>
): ActionReducer<{}> {
  return (state, action: Action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('Previous State', state);
    console.log('Action', action);
    console.log('Next State', result);
    console.groupEnd();
    return result;
  };
}
