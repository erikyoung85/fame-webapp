import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { getDistanceToNowObs } from '../../utils/get-distance-to-now-obs.util';

@Pipe({
  name: 'distanceToNow',
})
export class DistanceToNowPipe implements PipeTransform {
  transform(
    value: string | number | Date,
    strict = false,
    expiredString = 'Ended'
  ): Observable<string> {
    return getDistanceToNowObs(value, strict, expiredString);
  }
}
