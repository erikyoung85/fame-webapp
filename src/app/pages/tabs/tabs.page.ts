import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { TabRoutes } from 'src/app/app.routes';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';

type TabConfig = {
  label: string;
  iconSrc?: string;
  icon?: string;
  route: TabRoutes;
};

@Component({
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonLabel,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonTabs,
    NgFor,
    NgIf,
    LetDirective,
  ],
})
export class TabsPage implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  private readonly store = inject(Store);
  private readonly tabsService = inject(TabsService);

  private readonly tabsComponent = viewChild(IonTabs);

  protected readonly myTeamTab$: Observable<TabConfig> = this.store
    .select(teamsFeature.selectFavoriteTeam)
    .pipe(
      map((favoriteTeamAsync) => {
        const favoriteTeam = favoriteTeamAsync?.data;
        return favoriteTeam !== undefined
          ? {
              label: favoriteTeam.school.abbreviation ?? 'My Team',
              iconSrc: favoriteTeam.school.logoUrl,
              route: TabRoutes.MyTeam,
            }
          : {
              label: 'My Team',
              icon: 'home-sharp',
              route: TabRoutes.MyTeam,
            };
      })
    );

  protected readonly tabs: TabConfig[] = [
    {
      label: 'Search',
      icon: 'search-sharp',
      route: TabRoutes.Search,
    },
    {
      label: 'Account',
      icon: 'person-sharp',
      route: TabRoutes.Account,
    },
  ];

  ngOnInit(): void {
    this.tabsService.tabChanges$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((tab) => {
        this.tabsComponent()?.select(tab);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
