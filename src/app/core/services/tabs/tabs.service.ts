import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TabRoutes } from 'src/app/app.routes';

@Injectable({
  providedIn: 'root',
})
export class TabsService implements OnDestroy {
  private readonly _tabChanges$ = new Subject<TabRoutes>();
  readonly tabChanges$: Observable<TabRoutes> =
    this._tabChanges$.asObservable();

  changeTab(tab: TabRoutes): void {
    this._tabChanges$.next(tab);
  }

  ngOnDestroy(): void {
    this._tabChanges$.complete();
  }
}
