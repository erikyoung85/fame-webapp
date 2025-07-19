import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  isPast,
} from 'date-fns';
import {
  distinct,
  interval,
  map,
  Observable,
  startWith,
  takeWhile,
} from 'rxjs';

export function getDistanceToNowObs(
  value: string | number | Date,
  strict = false,
  expiredString = 'Ended'
): Observable<string> {
  return interval(1000).pipe(
    startWith(0), // Emit immediately
    map(() => {
      if (isPast(value)) {
        return expiredString;
      }
      return strict
        ? formatDistanceToNowStrict(value)
        : formatDistanceToNow(value);
    }),
    distinct(),
    takeWhile((result) => result !== expiredString, true) // Include the 'Ended' emission then complete
  );
}
