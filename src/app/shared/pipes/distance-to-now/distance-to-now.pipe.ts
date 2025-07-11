import { Pipe, PipeTransform } from '@angular/core';
import {
  formatDistanceToNow,
  formatDistanceToNowStrict,
  isPast,
} from 'date-fns';
import {
  Observable,
  distinct,
  interval,
  map,
  startWith,
  takeWhile,
} from 'rxjs';

@Pipe({
  name: 'distanceToNow',
})
export class DistanceToNowPipe implements PipeTransform {
  transform(
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
}
