import { NavigationExtras } from '@angular/router';

export interface RouterNavigatePayload {
  path: string;
  extras?: NavigationExtras;
}
