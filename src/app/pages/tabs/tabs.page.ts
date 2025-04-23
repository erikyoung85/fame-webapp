import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { TabRoutes } from 'src/app/app.routes';

type TabConfig = {
  label: string;
  icon: string;
  route: TabRoutes;
};

@Component({
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, NgFor],
})
export class TabsPage {
  tabs: TabConfig[] = [
    {
      label: 'My Team',
      icon: 'home-sharp',
      route: TabRoutes.MyTeam,
    },
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
}
