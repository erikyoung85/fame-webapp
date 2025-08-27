import { computed, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import {
  AsyncData,
  AsyncDataStatus,
  wrapAsAsyncData,
} from 'src/app/core/async-data';

/**
 * Combines multiple observables or signals into a single signal that indicates
 * whether any of the provided observables or signals are in a loading state.
 *
 * @param obs - An array of observables or signals to combine.
 * @param loadingStates - An array of loading states to check against. Defaults to [AsyncDataStatus.Loading].
 * @returns A signal that emits true if any of the provided observables or signals are in a loading state, false otherwise.
 */
export function combineIsLoading(
  obs: (Observable<AsyncData<unknown>> | Signal<AsyncData<unknown>>)[],
  loadingStates: AsyncDataStatus[] = [AsyncDataStatus.Loading]
): Signal<boolean> {
  // convert all observables to signals
  const signals: Signal<AsyncData<unknown>>[] = obs.map(
    (observableOrSignal) => {
      if (observableOrSignal instanceof Observable) {
        return toSignal(observableOrSignal, {
          initialValue: wrapAsAsyncData(undefined, AsyncDataStatus.Idle),
        });
      }
      return observableOrSignal;
    }
  );

  return computed(() =>
    signals.some((asyncSignal) => loadingStates.includes(asyncSignal().status))
  );
}
