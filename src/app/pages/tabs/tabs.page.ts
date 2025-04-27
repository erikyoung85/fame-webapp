import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
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
import { Subject, takeUntil } from 'rxjs';
import { TabRoutes } from 'src/app/app.routes';
import { TeamDetail } from 'src/app/core/models/TeamDetail.model';
import { TabsService } from 'src/app/core/services/tabs/tabs.service';

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
  imports: [IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, NgFor, NgIf],
})
export class TabsPage implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  private readonly tabsService = inject(TabsService);

  private readonly tabsComponent = viewChild(IonTabs);

  @Input() set favoriteTeam(teamDetail: TeamDetail | undefined) {
    this.myTeamTab =
      teamDetail !== undefined
        ? {
            label: teamDetail.school.abbreviation ?? 'My Team',
            iconSrc: teamDetail.school.logoUrl,
            route: TabRoutes.MyTeam,
          }
        : {
            label: 'My Team',
            icon: 'home-sharp',
            route: TabRoutes.MyTeam,
          };
  }

  myTeamTab!: TabConfig;

  tabs: TabConfig[] = [
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
