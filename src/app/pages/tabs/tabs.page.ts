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

@Component({
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, NgFor],
})
export class TabsPage {
  tabs: { label: string; icon: string; route: TabRoutes }[] = [
    {
      label: 'Tab1',
      icon: 'flash',
      route: TabRoutes.Tab1,
    },
    {
      label: 'Search',
      icon: 'search',
      route: TabRoutes.Search,
    },
    {
      label: 'Account',
      icon: 'person',
      route: TabRoutes.Account,
    },
  ];
}
